-- Créer la table des catégories
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

-- Créer la table des dépenses
CREATE TABLE IF NOT EXISTS expenses (
  ALTER TABLE expenses ADD COLUMN day DATE;
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    category TEXT NOT NULL, -- ou INTEGER si on lie à la table categories
    month TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SELECT * FROM expenses;
