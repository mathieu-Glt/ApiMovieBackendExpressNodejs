const tintinModel = require("../models/TintinModel");
const userModel = require("../models/UserModel");
const favoriesModel = require("../models/FavoriesModel");
const fs = require("fs");
const parseurl = require("parseurl");
const multer = require("multer");
const path = require("path");
const upload = require("../multerConfig");
const xss = require("xss");

exports.getAllTintins = async (req, res, next) => {
  console.log("access token user: ", req.id);

  try {
    if (req.id) {
      console.log("user is connected !");
      const tintins = await tintinModel.getAllTintin(req.id);
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
    } else {
      console.log("user is not connected !");

      const tintins = await tintinModel.getAllTintinUnknowUser();
      console.log("🚀 ~ exports.getAllTintinUnknowUser = ~ tintins:", tintins);
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
    }
  } catch (error) {
    console.log("error register route", error.message);
    res
      .status(500)
      .json({ status: 500, msg: "The server encountered an error" });
  }
};

exports.getTintinBestRate = async (req, res, next) => {
  console.log("access token user: ", req.id);

  try {
    const tintins = await tintinModel.getTintinBestRate(req.id);
    console.log("🚀 ~ exports.getTintinBestRate= ~ tintins:", tintins);
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

exports.getTintinById = async (req, res, next) => {
  console.log("🚀 ~ exports.getTintinById= ~ req:", req.params.id);

  try {
    const id = xss(req.params.id);
    const tintin = await tintinModel.getTintinById(id);
    console.log("🚀 ~ exports.getTintinById= ~ tintin:", tintin);
    if (tintin) {
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

exports.getTintinBySLug = async (req, res, next) => {
  console.log("🚀 ~ exports.getTintinBySLug= ~ req:", req.params.slug);

  try {
    const slug = xss(req.params.slug);
    const tintin = await tintinModel.getTintinBySlug(slug);
    console.log("🚀 ~ exports.getTintinBySLug= ~ tintin:", tintin);
    if (tintin) {
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

exports.getMovieTintinWithParam = async (req, res, next) => {
  console.log("🚀 ~ exports.getTintinBySLug= ~ req:", req.params.slug);

  try {
    const title = xss(req.params.query);
    const tintin = await tintinModel.getMovieTintinWithParam(title);
    console.log("🚀 ~ exports.getMovieTintinWithParam= ~ tintin:", tintin);
    if (tintin) {
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

exports.getRandomMovies = async (req, res, next) => {
  try {
    const tintin = await tintinModel.getRandomMovies();
    console.log("🚀 ~ exports.getMovieTintinWithParam= ~ tintin:", tintin);
    if (tintin) {
      return res.status(200).json({
        status: 200,
        msg: "Collection found",
        results: tintin,
      });
    } else {
      return res.status(404).json({
        status: 404,
        msg: "Collection not found",
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

exports.getAverageRateAllTintin = async (req, res, next) => {
  try {
    const tintinsAverageRate = await tintinModel.getAverageRateAllTintin();
    console.log(
      "🚀 ~ exports.getAverageRateAllTintin= ~ tintin:",
      tintinsAverageRate,
    );
    if (tintinsAverageRate) {
      return res.status(200).json({
        status: 200,
        msg: "Collection found",
        results: tintinsAverageRate,
      });
    } else {
      return res.status(404).json({
        status: 404,
        msg: "Collection not found",
        results: tintinsAverageRate,
      });
    }
  } catch (error) {
    console.log("error register route", error.message);
    res
      .status(500)
      .json({ status: 500, msg: "The server encountered an error" });
  }
};

exports.postTintin = async (req, res, next) => {
  console.log("🚀 req.body:", req.body);
  console.log("🚀 req.id:", req.id);

  if (!req.id) {
    return res.status(400).json({ status: 400, msg: "User ID is missing" });
  }

  const user = await userModel.getRoleUser(req.id);
  console.log("🚀 user role:", user);

  if (!user || user !== "admin") {
    return res.status(403).json({ status: 403, msg: "Unauthorized!" });
  }

  try {
    const { title, picture, synopsis, url, rate, slug } = req.body;

    if (!title || !picture || !synopsis || !url || !rate || !slug) {
      return res.status(400).json({
        status: 400,
        msg: "All fields are required",
      });
    }

    // Clean inputs
    const body = {
      title: xss(title),
      picture: xss(picture),
      synopsis: xss(synopsis),
      url: xss(url),
      rate: xss(rate),
      slug: xss(slug),
    };

    // Validation rate
    if (isNaN(body.rate) || body.rate < 0 || body.rate > 10) {
      return res.status(400).json({ status: 400, msg: "Invalid rate value" });
    }

    const [result] = await tintinModel.postTintin(body);
    console.log("🚀 insert result:", result);

    // ✅ FIXED result check
    if (result.affectedRows > 0) {
      return res.status(201).json({
        status: 201,
        msg: "The movie has been created!",
        id: result.insertId,
      });
    }

    return res.status(400).json({
      status: 400,
      msg: "Failed to create the movie",
    });
  } catch (error) {
    console.error("🚨 postTintin error:", error.message);
    return res.status(500).json({
      status: 500,
      msg: "The server encountered an error",
    });
  }
};

exports.uploadPicture = async (req, res, next) => {
  console.log("🚀 req.files:", req.files);
  console.log("🚀 req.id:", req.id);

  const user = await userModel.getRoleUser(req.id);

  if (user !== "admin") {
    return res.status(401).json({ status: 401, msg: "unauthorized !" });
  }

  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({
        status: 400,
        msg: "No file uploaded",
      });
    }

    const file = req.files.image;
    const uploadPath = "public/images/" + file.name;

    file.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          msg: "File upload failed",
        });
      }

      return res.status(200).json({
        status: 200,
        msg: "File uploaded successfully",
        url: file.name,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      msg: "Server error",
    });
  }
};

exports.updateRateTintin = async (req, res, next) => {
  try {
    // Extract data from request
    const userId = req.id; // Make sure req.id comes from your auth middleware (decoded JWT)
    const tintinId = xss(req.body.movieId);
    const rateStze = xss(req.body.rate);

    console.log("🚀 ~ updateRateTintin ~ userId:", userId);
    console.log("🚀 ~ updateRateTintin ~ tintinId:", tintinId);
    console.log("🚀 ~ updateRateTintin ~ rate:", rate);

    // Fetch the Tintin movie by ID
    const tintin = await tintinModel.getTintinById(tintinId);
    if (!tintin || tintin.length === 0) {
      return res.status(404).json({
        status: 404,
        msg: `Tintin movie with ID ${tintinId} not found`,
      });
    }

    // Get the user's role
    const user = await userModel.getRoleUser(userId);
    if (!user) {
      return res.status(404).json({ status: 404, msg: "User not found" });
    }

    console.log("🚀 ~ updateRateTintin ~ user role:", role);

    // Check if user is authorized
    if (role !== "admin" && role !== "user") {
      return res.status(403).json({ status: 403, msg: "User not authorized" });
    }

    // Validation du rate
    const rate = parseFloat(rateStze);
    if (isNaN(rate) || rate < 0 || rate > 10) {
      return res.status(400).json({ status: 400, msg: "Invalid rate value" });
    }

    // Save the rate to the user's favorites
    const rateMovie = await favoriesModel.saveOneRateMovieToFavoris(
      rate,
      userId,
      tintinId,
    );
    console.log("🚀 ~ updateRateTintin ~ rateMovie:", rateMovie);

    if (rateMovie.affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        msg: `The movie ${tintin[0].title} has been updated!`,
        results: rateMovie,
      });
    } else {
      return res.status(400).json({
        status: 400,
        msg: "Could not update the rating. Maybe the movie is not in favorites yet?",
      });
    }
  } catch (error) {
    console.error("🚨 ~ updateRateTintin error:", error.message);
    return res.status(500).json({
      status: 500,
      msg: "The server encountered an error",
      error: error.message,
    });
  }
};

exports.putTintin = async (req, res, next) => {
  console.log("🚀 ~ exports.putTintin= ~ req.body:", req.body);
  console.log("🚀 ~ exports.putTintin= ~ req.id:", req.id);
  console.log("🚀 ~ exports.putTintin= ~ req.params.id:", req.params.id);

  // Vérifie si req.id est défini
  if (!req.id) {
    return res.status(400).json({ status: 400, msg: "User ID is missing" });
  }

  try {
    let user = await userModel.getRoleUser(req.id);
    console.log("🚀 user:", user);
    console.log("🚀 user[0]:", user[0]);
    console.log("🚀 user role:", user[0]?.role);
    if (!user || !user[0]) {
      return res.status(404).json({ status: 404, msg: "User not found" });
    }

    // Vérifie si l'utilisateur est un administrateur
    if (user !== "admin") {
      return res.status(401).json({ status: 401, msg: "Unauthorized!" });
    }

    console.log("User admin !");

    const id = xss(req.params.id);
    const cleanedTitleMovie = xss(req.body.title);
    const cleanedPictureMovie = xss(req.body.picture);
    const cleanedSynopsisMovie = xss(req.body.synopsis);
    const cleanedUrlMovie = xss(req.body.url);
    const cleanedRateMovie = xss(req.body.rate);
    const cleanedSlugMovie = xss(req.body.slug);

    const body = {
      title: cleanedTitleMovie,
      picture: cleanedPictureMovie,
      synopsis: cleanedSynopsisMovie,
      url: cleanedUrlMovie,
      rate: cleanedRateMovie,
      slug: cleanedSlugMovie,
    };

    // Vérifie que rate est valide
    if (isNaN(body.rate) || body.rate < 0 || body.rate > 10) {
      return res.status(400).json({ status: 400, msg: "Invalid rate value" });
    }

    const [updateResult] = await tintinModel.putTintin(id, body);

    if (updateResult.affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        msg: `The movie has been updated!`,
        results: updateResult,
      });
    } else {
      return res.status(404).json({ status: 404, msg: "Movie not found" });
    }
  } catch (error) {
    console.log("Error during movie update:", error.message);
    return res
      .status(500)
      .json({ status: 500, msg: "The server encountered an error" });
  }
};

exports.patchMovieRateTintin = async (req, res, next) => {
  console.log("🚀 ~ exports.putTintin= ~ req.body.rate:", req.body.rate);
  console.log("🚀 ~ exports.putTintin= ~ req.id:", req.id);
  console.log("🚀 ~ exports.putTintin= ~ req.params.id:", req.params.id);
  let user = await userModel.getRoleUser(req.id);
  console.log("🚀 ~ exports.putTintin= getRoleUser ~ user:", user.role);
  if (user[0].role === "admin") {
    console.log("User admin !");
    try {
      const movieId = xss(req.params.id);
      const rateInput = xss(req.body.rate);
      const tintin = await tintinModel.getTintinById(movieId);
      console.log("🚀 ~ patchMovieRate: ~ tintin:", tintin);
      console.log("🚀 ~ patchMovieRate: ~ tintin:", tintin[0].title);
      const cleanedRateMovie = xss(req.body.rate);
      console.log(
        "🚀 ~ exports.patchMovieRateTintin= ~ cleanedRateMovie:",
        cleanedRateMovie,
      );

      const body = {
        rate: cleanedRateMovie,
      };

      const postTintin = await tintinModel.patchMovieRateTintin(id, rateInput);
      console.log("🚀 ~ exports.postTintin= ~ tintin:", postTintin);
      if (postTintin.affectedRows > 0) {
        return res.status(200).json({
          status: 201,
          msg: `The rate of movie ${tintin[0].title} has been updated !`,
          results: postTintin,
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

exports.deleteTintin = async (req, res, next) => {
  console.log("🚀 ~ exports.deleteTintin= ~ req.id:", req.id);
  console.log("🚀 ~ exports.deleteTintin= ~ req.params.id:", req.params.id);

  if (!req.id) {
    return res.status(400).json({ status: 400, msg: "User ID is missing" });
  }

  const idStze = xss(req.params.id);
  try {
    let user = await userModel.getRoleUser(req.id);

    if (!user) {
      return res.status(404).json({ status: 404, msg: "User not found" });
    }

    console.log("🚀 ~ exports.deleteTintin= getRoleUser ~ user:", user);

    if (user !== "admin") {
      return res.status(401).json({ status: 401, msg: "Unauthorized!" });
    }

    const tintin = await tintinModel.getTintinById(idStze);
    console.log("🚀 ~  getTintinById ", tintin);
    if (!tintin) {
      return res.status(404).json({ status: 404, msg: "Movie not found" });
    }

    console.log("🚀 ~ deleteTintin: ~ tintin:", tintin);

    const deleteTintin = await tintinModel.deleteTintin(idStze);
    console.log("🚀 ~ deleteTintin: ~ deleteTintin:", deleteTintin);

    // Access the ResultSetHeader which is at index 0
    if (deleteTintin[0].affectedRows > 0) {
      return res.status(200).json({
        msg: `The movie "${tintin[0].title}" has been deleted`,
        results: tintin,
      });
    } else {
      return res
        .status(400)
        .json({ status: 400, msg: "Failed to delete the movie" });
    }
  } catch (error) {
    console.log("Error during deletion:", error.message);
    return res
      .status(500)
      .json({ status: 500, msg: "The server encountered an error" });
  }
};
