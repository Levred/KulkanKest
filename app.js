// app.js
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

// Configuration de la base de données
const db = require('./config/database');

// Configuration de Passport
require('./config/passport')(passport);

// Configuration du middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuration des sessions
app.use(session({
    secret: 'votre_secret',
    resave: false,
    saveUninitialized: false
}));

// Initialisation de Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware pour les messages flash
app.use(flash());

// Variables globales
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Moteur de template
app.set('view engine', 'ejs');

// Routes
const authRoutes = require('./routes/auth');
const souvenirsRoutes = require('./routes/souvenirs');

app.use('/', souvenirsRoutes);
app.use('/', authRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
