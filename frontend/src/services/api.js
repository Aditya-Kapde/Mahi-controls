const BASE_URL = 'http://localhost:8080/api/v1';

async function fetchWithConfig(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
    }
    // Some endpoints like 204 No Content might not return JSON
    if (response.status === 204) return null;
    return await response.json();
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  // Public Products
  getProducts: (params = {}) => {
    const query = new URLSearchParams();
    if (params.categoryId) query.append('categoryId', params.categoryId);
    if (params.featured) query.append('featured', params.featured);
    if (params.page !== undefined) query.append('page', params.page);
    if (params.size) query.append('size', params.size);
    
    const queryString = query.toString();
    return fetchWithConfig(`/products${queryString ? `?${queryString}` : ''}`);
  },

  getProductBySlug: (slug) => {
    return fetchWithConfig(`/products/${slug}`);
  },

  // Public Categories
  getCategories: () => {
    return fetchWithConfig('/categories');
  },

  // Public RFQ
  submitRfq: (rfqPayload) => {
    return fetchWithConfig('/rfq', {
      method: 'POST',
      body: JSON.stringify(rfqPayload),
    });
  },

  // Auth
  loginAdmin: (credentials) => {
    return fetchWithConfig('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Admin RFQ
  getAdminRfqs: (token, status = null) => {
    const query = status ? `?status=${status}` : '';
    return fetchWithConfig(`/admin/rfq${query}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  updateRfqStatus: (token, rfqId, status) => {
    return fetchWithConfig(`/admin/rfq/${rfqId}/status`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
  },

  addRfqNote: (token, rfqId, note) => {
    return fetchWithConfig(`/admin/rfq/${rfqId}/notes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ note })
    });
  },

  // Admin Media
  uploadImage: async (file, folder, token) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    
    // Custom fetch for FormData
    const response = await fetch(`http://localhost:8080/api/v1/admin/media/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });
    if (!response.ok) throw new Error('Upload failed');
    return response.json();
  },

  // Admin Products
  getAdminProducts: (token, params = {}) => {
    const query = new URLSearchParams();
    if (params.page !== undefined) query.append('page', params.page);
    if (params.size) query.append('size', params.size);
    const queryString = query.toString();
    return fetchWithConfig(`/admin/products${queryString ? `?${queryString}` : ''}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },
  createProduct: (payload, token) => fetchWithConfig('/admin/products', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: JSON.stringify(payload) }),
  updateProduct: (id, payload, token) => fetchWithConfig(`/admin/products/${id}`, { method: 'PUT', headers: { 'Authorization': `Bearer ${token}` }, body: JSON.stringify(payload) }),
  archiveProduct: (id, token) => fetchWithConfig(`/admin/products/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } }),
  addProductImage: (id, payload, token) => fetchWithConfig(`/admin/products/${id}/images`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: JSON.stringify(payload) }),
  removeProductImage: (id, publicId, token) => fetchWithConfig(`/admin/products/${id}/images/${publicId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } }),

  // Projects
  getProjects: (params = {}) => {
    const query = new URLSearchParams();
    if (params.page !== undefined) query.append('page', params.page);
    if (params.size) query.append('size', params.size);
    const queryString = query.toString();
    return fetchWithConfig(`/projects${queryString ? `?${queryString}` : ''}`);
  },
  getProjectBySlug: (slug) => fetchWithConfig(`/projects/${slug}`),
  
  // Admin Projects
  getAdminProjects: (token, params = {}) => {
    const query = new URLSearchParams();
    if (params.page !== undefined) query.append('page', params.page);
    if (params.size) query.append('size', params.size);
    const queryString = query.toString();
    return fetchWithConfig(`/admin/projects${queryString ? `?${queryString}` : ''}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },
  createProject: (payload, token) => fetchWithConfig('/admin/projects', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: JSON.stringify(payload) }),
  updateProject: (id, payload, token) => fetchWithConfig(`/admin/projects/${id}`, { method: 'PUT', headers: { 'Authorization': `Bearer ${token}` }, body: JSON.stringify(payload) }),
  deleteProject: (id, token) => fetchWithConfig(`/admin/projects/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } })
};
