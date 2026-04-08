const fs = require('fs');
const slug = require('slug');
const parseurl = require('parseurl');
const express = require('express');
const withAuth = require('../middlewares/authMiddleware')
const router = express.Router();
const authController = require('../controllers/AuthController')


// endpoints welcome
router.get("/welcome", function (req, res) {
    res.json({ status: 200, results: "welcome to auth  routes" })
})

    // endpoints for get an user by its token
    router.get('/checkToken', withAuth, authController.getUser); // "OK"




module.exports = router;
