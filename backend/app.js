const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Connexion à PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Middlewares
app.use(cors());
app.use(express.json());

// Test API
app.get('/', (req, res) => {
  res.send('✅ API Suivi de Dépenses opérationnelle');
});

// Ajouter une dépense
app.post('/expenses', async (req, res) => {
  const { description, amount, category, month } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO expenses (description, amount, category, month) VALUES ($1, $2, $3, $4) RETURNING *',
      [description, amount, category, month]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erreur ajout dépense :', err);
    res.status(500).send('Erreur serveur');
  }
});

// Voir toutes les dépenses
app.get('/expenses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM expenses ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur liste dépenses :', err);
    res.status(500).send('Erreur serveur');
  }
});

// Résumé par mois
app.get('/expenses/monthly-summary', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT month, SUM(amount) AS total
      FROM expenses
      GROUP BY month
      ORDER BY month DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur résumé mensuel :', err);
    res.status(500).send('Erreur serveur');
  }
});

// Dépenses par catégorie
app.get('/expenses/by-category', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT category, SUM(amount) AS total
      FROM expenses
      GROUP BY category
      ORDER BY total DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur résumé catégories :', err);
    res.status(500).send('Erreur serveur');
  }
});

// Supprimer une dépense
app.delete('/expenses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM expenses WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error('Erreur suppression :', err);
    res.status(500).send('Erreur serveur');
  }
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log(`🚀 Serveur en écoute sur http://localhost:${port}`);
});
