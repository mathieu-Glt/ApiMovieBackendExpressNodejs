const connection = require("../db/db");

class FavoriesModel {
  // ─────────────────────────────────────────────
  // Add a Tintin movie to the user's favorites list
  // ─────────────────────────────────────────────
  static async postTintinListFavories(tokenUserId, movieId) {
    console.log(
      "🚀 ~ FavoriesModel ~ postTintinListFavories ~ movieId:",
      movieId,
    );
    console.log(
      "🚀 ~ FavoriesModel ~ postTintinListFavories ~ tokenUserId:",
      tokenUserId,
    );

    if (!tokenUserId) return null; // No user logged in

    try {
      const sql =
        "INSERT INTO Favoris (userId, tintinId, creation_times_tamp) VALUES (?, ?, NOW())";
      const [results] = await connection.query(sql, [tokenUserId, movieId]);
      console.log("🚀 ~ FavoriesModel ~ post results:", results);
      return results;
    } catch (err) {
      console.error("Error adding movie to favorites:", err.message);
      throw new Error("Error adding movie to favorites");
    }
  }

  // ─────────────────────────────────────────────
  // Get all Tintin movies in a user's favorites list
  // ─────────────────────────────────────────────
  static async getAllTintinFavoris(tokenUserId) {
    console.log(
      "🚀 ~ FavoriesModel ~ getAllTintinFavoris ~ tokenUserId:",
      tokenUserId,
    );

    if (!tokenUserId) return null; // No user logged in

    try {
      const sql = `
        SELECT t.*, f.id AS favorite
        FROM Tintins AS t
        LEFT JOIN Favoris AS f
        ON t.id = f.tintinId
        WHERE f.userId = ?
      `;
      const [results] = await connection.query(sql, [tokenUserId]);
      console.log("🚀 ~ FavoriesModel ~ getAllTintinFavoris results:", results);
      return results;
    } catch (err) {
      console.error("Error fetching favorites list:", err.message);
      throw new Error("Error fetching favorites list");
    }
  }

  // ─────────────────────────────────────────────
  // Get a specific Tintin movie from the favorites list by movie ID
  // ─────────────────────────────────────────────
  static async getTintinFavorisById(tokenUserId, movieId) {
    console.log(
      "🚀 ~ FavoriesModel ~ getTintinFavorisById ~ tokenUserId:",
      tokenUserId,
    );
    console.log(
      "🚀 ~ FavoriesModel ~ getTintinFavorisById ~ movieId:",
      movieId,
    );

    if (!tokenUserId) return null;

    try {
      const sql = `
  SELECT t.*, f.id AS favorite, f.userId AS utilisateur
  FROM Tintins AS t
  LEFT JOIN Favoris AS f
  ON t.id = f.tintinId AND f.userId = ?
  WHERE t.id = ?
`;
      const [rows] = await connection.query(sql, [tokenUserId, movieId]);
      console.log("🚀 ~ FavoriesModel ~ getTintinFavorisById rows:", rows);
      return rows.length > 0 ? rows[0] : null;
    } catch (err) {
      console.error("Error fetching favorite by movie ID:", err.message);
      throw new Error("Error fetching favorite by movie ID");
    }
  }

  // ─────────────────────────────────────────────
  // Save a rating for a movie in the user's favorites list
  // ─────────────────────────────────────────────
  static async saveOneRateMovieToFavoris(rate, userId, movieId) {
    console.log(
      "🚀 ~ FavoriesModel ~ saveOneRateMovieToFavoris ~ movieId:",
      movieId,
    );
    console.log(
      "🚀 ~ FavoriesModel ~ saveOneRateMovieToFavoris ~ userId:",
      userId,
    );
    console.log("🚀 ~ FavoriesModel ~ saveOneRateMovieToFavoris ~ rate:", rate);

    try {
      const sql =
        "UPDATE Favoris SET rate = ? WHERE userId = ? AND tintinId = ?";
      const [results] = await connection.query(sql, [rate, userId, movieId]);
      console.log(
        "🚀 ~ FavoriesModel ~ saveOneRateMovieToFavoris results:",
        results,
      );
      return results;
    } catch (err) {
      console.error("Error saving movie rating to favorites:", err.message);
      throw new Error("Error saving movie rating to favorites");
    }
  }

  // ─────────────────────────────────────────────
  // Remove a movie from the user's favorites list
  // ─────────────────────────────────────────────
  static async deleteTintinFromFavoritesById(userId, movieId) {
    console.log(
      "🚀 ~ FavoriesModel ~ deleteTintinFromFavoritesById ~ movieId:",
      movieId,
    );
    console.log(
      "🚀 ~ FavoriesModel ~ deleteTintinFromFavoritesById ~ userId:",
      userId,
    );

    try {
      const sql = "DELETE FROM Favoris WHERE userId = ? AND tintinId = ?";
      const [results] = await connection.query(sql, [userId, movieId]);
      console.log(
        "🚀 ~ FavoriesModel ~ deleteTintinFromFavoritesById results:",
        results,
      );
      return results;
    } catch (err) {
      console.error("Error deleting movie from favorites:", err.message);
      throw new Error("Error deleting movie from favorites");
    }
  }
}

module.exports = FavoriesModel;
