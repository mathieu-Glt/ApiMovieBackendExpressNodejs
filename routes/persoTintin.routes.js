const fs = require('fs');
const slug = require('slug');
const parseurl = require('parseurl');
const express = require('express');
const router = express.Router();
const persoController = require('../controllers/PersoController')


router.get("/welcome", function (req, res) {
    res.json({ status: 200, results: "welcome to perso Tintin  routes" })
})

    // route qui récupère tous les données du personnage Tintin
    router.get('/', persoController.getAllPersoTintin) // "OK"
    // route qui récupère un seul perso de tintin
    router.get('/:id', persoController.getPersoTintinById) // "OK"





module.exports = router;
