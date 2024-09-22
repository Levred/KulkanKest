// models/History.js
const db = require('../config/database');

class History {
    constructor(data) {
        this.id = data.id;
        this.action = data.action;
        this.userId = data.userId;
        this.souvenirId = data.souvenirId;
        this.timestamp = data.timestamp;
    }

    save(callback) {
        db.run(`INSERT INTO history (action, userId, souvenirId, timestamp) VALUES (?, ?, ?, ?)`,
            [this.action, this.userId, this.souvenirId, this.timestamp],
            function(err) {
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
    }

    static findBySouvenirId(souvenirId, callback) {
        db.all(`SELECT * FROM history WHERE souvenirId = ? ORDER BY timestamp DESC`, [souvenirId], (err, rows) => {
            if (err) {
                return callback(err);
            }
            const history = rows.map(row => new History(row));
            callback(null, history);
        });
    }
}

module.exports = History;
