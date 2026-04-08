const fs = require("fs");
const slug = require("slug");
const parseurl = require("parseurl");
const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController.js");
const mwValidateLogin = require("../middlewares/validationLoginMiddleware.js");
const mwValidateRegister = require("../middlewares/validationRegsiterMiddleware.js");
const withAuth = require("../middlewares/authMiddleware.js");

// endpoints welcome
router.get("/users", function (req, res) {
  res.json({ status: 200, results: "welcome to users routes" });
});

// endpoints that takes a user saved by its id
router.get("/:id", userController.getUserById); // "OK"
// endpoints for the connection of user
router.post("/login", mwValidateLogin, userController.login); // "OK"
// endpoints for the record of user
router.post("/register", mwValidateRegister, userController.register); // "OK"
// endpoints for the logout user
router.post("/logout", withAuth, userController.logout); // "OK"

module.exports = router;
