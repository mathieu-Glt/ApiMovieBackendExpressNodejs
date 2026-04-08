const fs = require('fs');
const slug = require('slug');
const parseurl = require('parseurl');
const express = require('express');
const withAuth = require('../middlewares/authMiddleware')
const router = express.Router();
const characterController = require('../controllers/CharacterController')


// endpoints welcome
router.get("/welcome", function (req, res) {
    res.json({ status: 200, results: "welcome to characters  routes" })
})

    // endpoints take the  collection'Character of Tintin
    router.get('/', characterController.getAllCharacters); // "OK"
    // endpoint take one tintin inside of the collection tintin by id
    router.get('/:id', characterController.getCharacterById); // "OK"
    // endpoint take one tintin inside of the collection tintin by its slug
    router.get('/v2/:slug', characterController.getCharacterBySLug);  // "OK"
    // endpoint take one tintin inside of the collection tintin by its name
    router.get('/v1/:name', characterController.getCharacterByName); // "OK"
    // route pour supprimer un personnage
    router.delete('/character/delete/:id', withAuth, characterController.deleteCharater) // "OK"
    // route pour enregistrer un personnage
    router.post('/character/save', withAuth, characterController.postCharacter) // "OK"
    // route pour modifier un personnage
    router.put('/character/update/:id', withAuth, characterController.putCharacter) // "OK"
    // route pour enregistrer une image du personnage
    router.post('/character/upload/pict', withAuth, characterController.uploadPicture) // "OK"

module.exports = router;
