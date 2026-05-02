-- Rodar isso se o banco já existia antes de adicionar listas

CREATE TABLE IF NOT EXISTS lists (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  color VARCHAR(7) DEFAULT '#3b82f6',
  is_archived BOOLEAN DEFAULT FALSE
);

ALTER TABLE todos ADD COLUMN IF NOT EXISTS list_id INTEGER REFERENCES lists(id) ON DELETE SET NULL;
