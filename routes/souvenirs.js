// routes/souvenirs.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const souvenirsController = require('../controllers/souvenirsController');
const { ensureAuthenticated } = require('../middlewares/auth');
const path = require('path');

// Configuration de multer pour l'upload des images
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Routes
router.get('/', ensureAuthenticated, souvenirsController.afficherSouvenirs);
router.get('/ajouter', ensureAuthenticated, souvenirsController.afficherFormulaireAjout);
router.post('/ajouter', ensureAuthenticated, upload.single('image'), souvenirsController.ajouterSouvenir);
router.get('/souvenir/:id/historique', ensureAuthenticated, souvenirsController.afficherHistorique);

module.exports = router;
