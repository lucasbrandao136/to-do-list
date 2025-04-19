-- Criação das tabelas

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  registered_at TIMESTAMP NOT NULL,
  enabled_at BOOLEAN,
  birthday DATE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  photo_url VARCHAR(255)
);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  photo_url VARCHAR(255),
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  due_date TIMESTAMP
);

