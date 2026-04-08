const fs = require("fs");
const slug = require("slug");
const parseurl = require("parseurl");
const express = require("express");
const router = express.Router();
const tintinController = require("../controllers/TintinController.js");
const withAuth = require("../middlewares/authMiddleware.js");

// endpoints welcome
router.get("/welcome", function (req, res) {
  res.json({ status: 200, results: "welcome to tintins routes" });
});
// route qui renvoie tous les films de tintin pour les utilisateurs non inscrits
router.get("/unknowuser/movies", tintinController.getAllTintins); // "OK"
// route qui récupère les films les mieux notés jusqu'a 7 films
router.get("/best/rate", withAuth, tintinController.getTintinBestRate); // "OK"
// route qui récupère les films les mieux notés jusqu'a 7 films pour un utilisateur non connecté
router.get("/best/rate/unknowuser", tintinController.getTintinBestRate); // "OK"
// route qui permet de poster une note sur un film
router.patch("/movie/rate", withAuth, tintinController.updateRateTintin); // "ok"
// endpoints take the  collection'Tintin films
router.get("/", withAuth, tintinController.getAllTintins); // "ok"
// endpoint take one tintin inside of the collection tintin by id
router.get("/:id", tintinController.getTintinById); // "OK"
// endpoint take one tintin inside of the collection tintin by its slug
router.get("/v1/:slug", tintinController.getTintinBySLug); // "OK"
// endpoint take one tintin inside of the collection tintin by its titre
router.get("/v2/:query", tintinController.getMovieTintinWithParam); // "OK"
// endpoint take tintin'movies random limit 1
router.get("/v3/random_movie", tintinController.getRandomMovies); // "OK"
// endpoint take tintin'movies with average rate
router.get("/rate_average", tintinController.getAverageRateAllTintin); // "OK"
// endpoint for to save record a  tintin movie
router.post("/save", withAuth, tintinController.postTintin); // "OK"
// endpoint for to save record a picture tintin movie
router.post("/upload/pict", withAuth, tintinController.uploadPicture); // "OK"
// endpoint for to update record a  tintin movie
router.put("/update/:id", withAuth, tintinController.putTintin); // "OK"
// endpoint for to update  a  rate tintin movie
router.patch(
  "/tintin/update/rate/:id",
  withAuth,
  tintinController.patchMovieRateTintin,
); // "OK"
// endpoint for delete a  tintin movie
router.delete("/delete/:id", withAuth, tintinController.deleteTintin); // "OK"

module.exports = router;
