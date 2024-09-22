// models/Souvenir.js
const db = require('../config/database');

class Souvenir {
    constructor(data) {
        this.id = data.id;
        this.image = data.image;
        this.titre = data.titre;
        this.description = data.description;
        this.date = data.date;
        this.tags = data.tags;
        this.amis = data.amis;
        this.userId = data.userId;
    }

    save(callback) {
        db.run(`INSERT INTO souvenirs (image, titre, description, date, tags, amis, userId) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [this.image, this.titre, this.description, this.date, this.tags, this.amis, this.userId],
            function(err) {
                if (err) {
                    return callback(err);
                }
                callback(null, this.lastID);
            });
    }

    static findAllByUser(userId, callback) {
        db.all(`SELECT * FROM souvenirs WHERE userId = ? ORDER BY date DESC`, [userId], (err, rows) => {
            if (err) {
                return callback(err);
            }
            const souvenirs = rows.map(row => new Souvenir(row));
            callback(null, souvenirs);
        });
    }

    static findById(id, callback) {
        db.get(`SELECT * FROM souvenirs WHERE id = ?`, [id], (err, row) => {
            if (err) {
                return callback(err);
            }
            callback(null, row ? new Souvenir(row) : null);
        });
    }

    update(callback) {
        db.run(`UPDATE souvenirs SET image = ?, titre = ?, description = ?, date = ?, tags = ?, amis = ? WHERE id = ?`,
            [this.image, this.titre, this.description, this.date, this.tags, this.amis, this.id],
            function(err) {
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
    }
}

module.exports = Souvenir;
