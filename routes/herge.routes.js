const fs = require('fs');
const slug = require('slug');
const parseurl = require('parseurl');
const express = require('express');
const withAuth = require('../middlewares/authMiddleware')
const router = express.Router();
const hergeController = require('../controllers/HergeController')




// endpoints welcome
router.get("/welcome", function (req, res) {
    res.json({ status: 200, results: "welcome to herge  routes" })
})


    // endpoints take the  collection'Herge
    router.get('/', hergeController.getAllHerge) // "OK"
    // endpoint take one herge inside of the collection author by id
    router.get('/:id', hergeController.getHergeById); // "OK"







module.exports = router;
