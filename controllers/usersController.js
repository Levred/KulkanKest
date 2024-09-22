// controllers/usersController.js
const User = require('../models/User');
const passport = require('passport');

exports.register = (req, res) => {
    const { username, password, password2 } = req.body;
    let errors = [];

    if (!username || !password || !password2) {
        errors.push({ msg: 'Veuillez remplir tous les champs' });
    }

    if (password != password2) {
        errors.push({ msg: 'Les mots de passe ne correspondent pas' });
    }

    if (errors.length > 0) {
        res.render('register', { errors, username, password, password2 });
    } else {
        User.findByUsername(username, (err, user) => {
            if (user) {
                errors.push({ msg: 'Ce nom d\'utilisateur est déjà pris' });
                res.render('register', { errors, username, password, password2 });
            } else {
                const newUser = new User({ username, password });
                User.create(newUser, (err, user) => {
                    if (err) throw err;
                    req.flash('success_msg', 'Vous êtes inscrit et pouvez vous connecter');
                    res.redirect('/login');
                });
            }
        });
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Vous êtes déconnecté');
    res.redirect('/login');
};
