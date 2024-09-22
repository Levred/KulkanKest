// init_db.js
const db = require('./config/database');

db.serialize(() => {
    // Table des utilisateurs
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);

    // Table des souvenirs
    db.run(`CREATE TABLE IF NOT EXISTS souvenirs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        titre TEXT,
        description TEXT,
        date TEXT,
        tags TEXT,
        amis TEXT,
        userId INTEGER,
        FOREIGN KEY(userId) REFERENCES users(id)
    )`);

    // Table de l'historique
    db.run(`CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        action TEXT,
        userId INTEGER,
        souvenirId INTEGER,
        timestamp TEXT,
        FOREIGN KEY(userId) REFERENCES users(id),
        FOREIGN KEY(souvenirId) REFERENCES souvenirs(id)
    )`);
});

db.close();
