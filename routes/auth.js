// routes/auth.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// routes/auth.js

// Formulaire d'inscription
router.get('/register', (req, res) => {
    res.render('register', {
        errors: [],
        username: '',
        password: '',
        password2: ''
    });
});


// Traitement de l'inscription
router.post('/register', usersController.register);

// Formulaire de connexion
router.get('/login', (req, res) => res.render('login'));

// Traitement de la connexion
router.post('/login', usersController.login);

// Déconnexion
router.get('/logout', usersController.logout);

module.exports = router;
