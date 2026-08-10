CREATE TABLE projects (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    client_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    completion_year INTEGER,
    summary VARCHAR(500) NOT NULL,
    description TEXT,
    equipment_supplied TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    primary_image_url VARCHAR(255),
    image_public_id VARCHAR(255),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
