const fs = require('fs');
const slug = require('slug');
const parseurl = require('parseurl');
const express = require('express');
const withAuth = require('../middlewares/authMiddleware')
const router = express.Router();
const favoriesController = require('../controllers/FavoriesController')

// endpoints welcome
router.get("/welcome", function (req, res) {
    res.json({ status: 200, results: "welcome to favories movies routes" })
})


// route qui récupère tous les films mis en favoris
router.get('/', withAuth, favoriesController.getAllTintinsFavoris) // "OK"
// route qui récupère un film mis en favoris
router.get('/:id', withAuth, favoriesController.getTintinsFavorisById); // "OK"
// route de suppression d'un film en favoris pour utilisateur
router.delete('/:id', withAuth, favoriesController.deleteTintinFavoris) // "OK"
// route pour poster un film dans sa liste de favoris en tant que utilisateur connecté
// router.post('/tintin/:id', withAuth, favoriesController.postTintinListFavories) // "OK"
router.post('/tintin/', withAuth, favoriesController.postTintinListFavories) // "OK"



module.exports = router;
