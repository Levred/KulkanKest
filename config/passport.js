// config/passport.js
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
        // Chercher l'utilisateur
        User.findByUsername(username, (err, user) => {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'Nom d\'utilisateur incorrect' });
            }

            // Comparer les mots de passe
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Mot de passe incorrect' });
                }
            });
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};
