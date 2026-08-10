import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'));
  const [user, setUser] = useState(null); // Decode JWT later if needed for roles
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('admin_token', token);
      // Optional: Add logic to decode JWT or fetch user profile here
      setUser({ role: 'ADMIN' }); // placeholder for demo
    } else {
      localStorage.removeItem('admin_token');
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await api.loginAdmin({ email, password });
      if (response && response.token) {
        setToken(response.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login Error", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
