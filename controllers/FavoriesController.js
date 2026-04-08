const tintinModel = require("../models/TintinModel");
const userModel = require("../models/UserModel");
const favoriesModel = require("../models/FavoriesModel");
const fs = require("fs");
const parseurl = require("parseurl");
const multer = require("multer");
const path = require("path");
const upload = require("../multerConfig");
const xss = require("xss");
const TintinModel = require("../models/TintinModel");

exports.postTintinListFavories = async (req, res, next) => {
  console.log("access token user: ", req.id);
  console.log("le film: ", req.body);
  try {
    if (req.id) {
      const movie = await tintinModel.getTintinByTitle(req.body.movieTitle);
      console.log("🚀 ~ exports.postTintinListFavories= ~ movie:", movie);
      const tintin = await favoriesModel.getTintinFavorisById(
        req.id,
        movie[0].id,
      );
      console.log("🚀 ~ exports.postTintinListFavories= ~ tintin:", tintin);
      if (tintin.length > 0) {
        return res.status(400).json({
          status: 400,
          msg: `the movie already exists !`,
          results: tintin,
        });
      } else {
        const tintniFavoris = await favoriesModel.postTintinListFavories(
          req.id,
          movie[0].id,
        );
        if (tintniFavoris.affectedRows > 0) {
          return res.status(200).json({
            status: 201,
            msg: `The movie ${movie.title} has been added to your list favories !`,
            results: tintniFavoris,
          });
        }
      }
    } else {
      return res.status(401).json({
        status: 401,
        msg: "Not authorized",
        results: tintniFavoris,
      });
    }
  } catch (error) {
    console.log("error register route", error.message);
    res
      .status(500)
      .json({ status: 500, msg: "The server encountered an error" });
  }
};
exports.getAllTintinsFavoris = async (req, res, next) => {
  console.log("access token user: ", req.id);

  try {
    const tintins = await favoriesModel.getAllTintinFavoris(req.id);
    console.log("🚀 ~ exports.getAllTintins= ~ tintins:", tintins);
    if (tintins.length > 0) {
      return res.status(200).json({
        status: 200,
        msg: "Collection found",
        results: tintins,
      });
    } else {
      return res.status(404).json({
        status: 404,
        msg: "Collection not found",
        results: tintins,
      });
    }
  } catch (error) {
    console.log("error register route", error.message);
    res
      .status(500)
      .json({ status: 500, msg: "The server encountered an error" });
  }
};

exports.getTintinsFavorisById = async (req, res, next) => {
  console.log("access token user: ", req.id);

  try {
    const tintin = await favoriesModel.getTintinFavorisById(
      req.id,
      req.params.id,
    );
    console.log("🚀 ~ exports.getTintinsFavorisById= ~ tintin:", tintin);
    if (tintin.length > 0) {
      return res.status(200).json({
        status: 200,
        msg: "tintin found",
        results: tintin,
      });
    } else {
      return res.status(404).json({
        status: 404,
        msg: "tintin not found",
        results: tintin,
      });
    }
  } catch (error) {
    console.log("error register route", error.message);
    res
      .status(500)
      .json({ status: 500, msg: "The server encountered an error" });
  }
};

exports.deleteTintinFavoris = async (req, res, next) => {
  console.log("🚀 ~ exports.deleteTintinFavoris= ~ req.id:", req.id);
  console.log(
    "🚀 ~ exports.deleteTintinFavoris= ~ req.params.id:",
    req.params.id,
  );
  let user = await userModel.getRoleUser(req.id);
  console.log(
    "🚀 ~ exports.deleteTintinFavoris= getRoleUser ~ user:",
    user.role,
  );
  let tintin = await tintinModel.getTintinById(req.params.id);
  if (user[0].role === "admin" || user[0].role === "user") {
    console.log("User admin  ou user !");
    try {
      const id = req.params.id;
      const deleteTintin = await favoriesModel.deleteTintinFromFavoritesById(
        req.id,
        id,
      );
      console.log("🚀 ~ deleteTintin: ~ deleteTintin:", deleteTintin);
      if (deleteTintin.affectedRows > 0) {
        return res.status(200).json({
          msg: `the movie ${tintin[0].title} has been deleted`,
          results: tintin,
        });
      }
    } catch (error) {
      console.log("error register route", error.message);
      res
        .status(500)
        .json({ status: 500, msg: "The server encountered an error" });
    }
  } else {
    res.json({ status: 401, msg: "unauthorized !" });
  }
};
