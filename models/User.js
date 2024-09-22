// models/User.js
const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.password = data.password;
    }

    static create(newUser, callback) {
        bcrypt.hash(newUser.password, 10, (err, hash) => {
            if (err) throw err;
            db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [newUser.username, hash], function(err) {
                if (err) {
                    return callback(err);
                }
                newUser.id = this.lastID;
                callback(null, newUser);
            });
        });
    }

    static findByUsername(username, callback) {
        db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
            if (err) {
                return callback(err);
            }
            callback(null, row ? new User(row) : null);
        });
    }

    static findById(id, callback) {
        db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
            if (err) {
                return callback(err);
            }
            callback(null, row ? new User(row) : null);
        });
    }
}

module.exports = User;
