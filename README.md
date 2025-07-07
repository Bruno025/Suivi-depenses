# 💸 Suivi de Dépenses – Projet JavaScript + PostgreSQL

Ce projet est une application web simple pour suivre ses **dépenses mensuelles**, développée en **HTML/CSS/JavaScript** pour le frontend et **Node.js + Express + PostgreSQL** pour le backend.

---

## 🔧 Fonctionnalités

- ✅ Ajouter une dépense (avec description, montant, catégorie, et mois)
- ✅ Afficher toutes les dépenses
- ✅ Filtrer par **mois**
- ✅ Supprimer une dépense précise
- ✅ Visualiser les dépenses par catégorie avec un graphique (Chart.js)
- ✅ Persistance des données avec PostgreSQL

---

## 📁 Structure du projet

```

Suivi-depenses/
├── backend/
│   ├── .env            ← Configuration PostgreSQL
│   ├── app.js           ← Serveur Express + routes API
│   └── expenses.sql     ← Script SQL pour créer la table `expenses`
│
├── frontend/
│   ├── index.html       ← Interface utilisateur
│   ├── script.js        ← Logique JS (formulaire + fetch API)
│   └── styles.css       ← Design personnalisé (Persona 5 style)
├── .gitignore
├── LICENSE            ← Licence MIT
└── README.md          ← Documentation du projet

````

---

## ▶️ Démarrage rapide

### 1. Installer les dépendances (dans /backend)

```bash
npm install
````

### 2. Créer la base de données PostgreSQL

Dans pgAdmin ou psql, créez la base `suivi_depenses`, puis exécutez :

```sql
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
```

### 3. Configurer les variables d’environnement

Créez un fichier `.env` dans `/backend` :

```
DATABASE_URL=postgresql://postgres:VOTRE_MDP@localhost:5432/suivi_depenses
PORT=3000
```

> Remplacez `VOTRE_MDP` par votre mot de passe PostgreSQL.

### 4. Lancer le serveur

```bash
nodemon app.js ou 
node app.js #si nodemon n'est pas installé
```

---

## 🌐 Utilisation de l’interface

* Ouvrez `frontend/index.html` dans votre navigateur
* Ajoutez des dépenses via le formulaire
* Affichez-les par catégorie ou par mois
* Supprimez une dépense avec le bouton Supprimer
* Les données sont enregistrées et consultées via l'API Express

---

## 📦 Technologies utilisées

* **Frontend** : HTML, CSS, JavaScript, Chart.js
* **Backend** : Node.js, Express.js, pg, dotenv, cors
* **Base de données** : PostgreSQL

---

## 🛡️ Licence

Ce projet est sous licence **MIT**. Vous pouvez l'utiliser, le modifier, le redistribuer librement tant que vous incluez cette mention.

---

```

---
