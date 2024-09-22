// config/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbFile = path.join(__dirname, '../database.sqlite');

const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données SQLite :', err);
    } else {
        console.log('Connecté à la base de données SQLite');
    }
});

module.exports = db;
