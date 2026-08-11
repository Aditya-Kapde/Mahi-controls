-- Seed default admin user matching basic users schema
INSERT INTO users (email, password, full_name, role)
SELECT 'admin@indussource.com', 
       '$2a$10$e0MYzXyjpJS7Pd0RVvHwHe1f1qVn.4rQ5N3O5vH9H9Gg2b.B/5S9.', 
       'System Administrator', 
       'ADMIN'
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'admin@indussource.com'
);
