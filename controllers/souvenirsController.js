// controllers/souvenirsController.js
const Souvenir = require('../models/Souvenir');
const History = require('../models/History');
const path = require('path');

exports.afficherSouvenirs = (req, res) => {
    Souvenir.findAllByUser(req.user.id, (err, souvenirs) => {
        if (err) throw err;
        res.render('index', { souvenirs });
    });
};

exports.afficherFormulaireAjout = (req, res) => {
    res.render('ajouter');
};

exports.ajouterSouvenir = (req, res) => {
    const { titre, description, date, tags, amis } = req.body;
    let image = '';

    if (req.file) {
        image = '/uploads/' + req.file.filename;
    }

    const newSouvenir = new Souvenir({
        image,
        titre,
        description,
        date,
        tags,
        amis,
        userId: req.user.id
    });

    newSouvenir.save((err, souvenirId) => {
        if (err) throw err;
        const history = new History({
            action: 'ajout',
            userId: req.user.id,
            souvenirId: souvenirId,
            timestamp: new Date()
        });
        history.save((err) => {
            if (err) throw err;
            req.flash('success_msg', 'Souvenir ajouté avec succès');
            res.redirect('/');
        });
    });
};

exports.afficherHistorique = (req, res) => {
    const souvenirId = req.params.id;
    History.findBySouvenirId(souvenirId, (err, historique) => {
        if (err) throw err;
        res.render('historique', { historique });
    });
};
