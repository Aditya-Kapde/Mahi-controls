-- Seed default admin user if not exists
-- Uses standard 'password' column name
INSERT INTO users (email, password, full_name, role, is_active, created_at, updated_at)
SELECT 'admin@indussource.com', 
       '$2a$10$e0MYzXyjpJS7Pd0RVvHwHe1f1qVn.4rQ5N3O5vH9H9Gg2b.B/5S9.', 
       'System Administrator', 
       'ADMIN', 
       true, 
       CURRENT_TIMESTAMP, 
       CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'admin@indussource.com'
);
