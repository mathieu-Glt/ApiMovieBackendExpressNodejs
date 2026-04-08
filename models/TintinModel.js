const connection = require("../db/db");

class TintinModel {
  // ─────────────────────────────────────────────
  // Get all Tintin movies, optionally for a connected user
  // ─────────────────────────────────────────────
  static async getAllTintin(tokenUserId) {
    console.log("🚀 ~ TintinModel ~ getAllTintin ~ tokenUserId:", tokenUserId);

    try {
      if (!tokenUserId) {
        console.log("No user connected!");
        const [rows] = await connection.query("SELECT * FROM Tintins");
        return rows;
      } else {
        console.log("User connected!");
        const sql = `
          SELECT t.*, f.id AS favorite
          FROM Tintins AS t
          LEFT JOIN Favoris AS f
          ON t.id = f.tintinId AND f.userId = ?
        `;
        const [rows] = await connection.query(sql, [tokenUserId]);
        return rows;
      }
    } catch (err) {
      console.error("Error fetching Tintins:", err.message);
      throw new Error("Error fetching Tintin movies");
    }
  }

  // ─────────────────────────────────────────────
  // Get all Tintin movies for non-connected users
  // ─────────────────────────────────────────────
  static async getAllTintinUnknowUser() {
    console.log("🚀 ~ TintinModel ~ getAllTintinUnknowUser");
    try {
      const results = await connection.query("SELECT * FROM Tintins");
      return results;
    } catch (err) {
      console.error("Error fetching Tintins for unknown user:", err.message);
      throw new Error("Error fetching Tintin movies");
    }
  }

  static async getRandomMovies(limit = 1) {
    try {
      const sql = `SELECT * FROM Tintins ORDER BY RAND() LIMIT ?`;
      const [results] = await connection.query(sql, [limit]);
      return results;
    } catch (error) {
      console.error("Error fetching Tintins for unknown user:", err.message);
      throw new Error("Error fetching Tintin movies");
    }
  }

  // Get all Tintin movies with their average rating
  static async getAverageRateAllTintin() {
    try {
      const sql = `
        SELECT 
          t.id, t.title, t.picture, t.synopsis, t.movie, t.slug, t.creation_times_tamp,
          AVG(f.rate) AS average_rate
        FROM Tintins AS t
        LEFT JOIN Favoris AS f ON t.id = f.tintinId
        GROUP BY t.id
        ORDER BY t.id ASC
      `;

      const [results] = await connection.query(sql);
      return results;
    } catch (err) {
      console.error(
        "Error fetching Tintin movies with average rate:",
        err.message,
      );
      throw new Error("Error fetching Tintin movies");
    }
  }

  // ─────────────────────────────────────────────
  // Get best-rated Tintin movies (top 7), optionally for a connected user
  // ─────────────────────────────────────────────
  static async getTintinBestRate(tokenUserId) {
    console.log(
      "🚀 ~ TintinModel ~ getTintinBestRate ~ tokenUserId:",
      tokenUserId,
    );

    try {
      if (!tokenUserId) {
        const sql = `
          SELECT DISTINCT title, picture, synopsis, movie, rating
          FROM Tintins
          ORDER BY rating DESC
          LIMIT 7
        `;
        const results = await connection.query(sql);
        return results;
      } else {
        const sql = `
          SELECT DISTINCT t.*, f.id AS favorite
          FROM Tintins AS t
          LEFT JOIN Favoris AS f
          ON t.id = f.tintinId AND f.userId = ?
          ORDER BY rating DESC
          LIMIT 7
        `;
        const results = await connection.query(sql, [tokenUserId]);
        return results;
      }
    } catch (err) {
      console.error("Error fetching top-rated Tintins:", err.message);
      throw new Error("Error fetching best-rated Tintin movies");
    }
  }

  // ─────────────────────────────────────────────
  // Get a Tintin movie by ID
  // ─────────────────────────────────────────────
  static async getTintinById(id) {
    try {
      const results = await connection.query(
        "SELECT * FROM Tintins WHERE id = ?",
        [id],
      );
      return results.length > 0 ? results[0] : null;
    } catch (err) {
      console.error("Error fetching Tintin by ID:", err.message);
      throw new Error("Error fetching Tintin movie");
    }
  }

  // ─────────────────────────────────────────────
  // Get a Tintin movie by title
  // ─────────────────────────────────────────────
  static async getTintinByTitle(title) {
    console.error("getTintinByTitle - title : ", title);

    try {
      const [rows] = await connection.query(
        "SELECT * FROM Tintins WHERE title = ?",
        [title],
      );
      console.error("getTintinByTitle - rows : ", rows);
      return rows;
    } catch (err) {
      console.error("Error fetching Tintin by title:", err.message);
      throw new Error("Error fetching Tintin movie");
    }
  }

  // ─────────────────────────────────────────────
  // Get a Tintin movie by slug
  // ─────────────────────────────────────────────
  static async getTintinBySlug(slug) {
    try {
      const results = await connection.query(
        "SELECT * FROM Tintins WHERE slug = ?",
        [slug],
      );
      return results.length > 0 ? results[0] : null;
    } catch (err) {
      console.error("Error fetching Tintin by slug:", err.message);
      throw new Error("Error fetching Tintin movie");
    }
  }

  // ─────────────────────────────────────────────
  // Search Tintin movies by title (partial match)
  // ─────────────────────────────────────────────
  static async getMovieTintinWithParam(query) {
    try {
      const searchQuery = `%${query}%`;
      const results = await connection.query(
        "SELECT * FROM Tintins WHERE title LIKE ?",
        [searchQuery],
      );
      console.log("getMovieTintinWithParam ~ results : ", results);
      return results;
    } catch (err) {
      console.error("Error searching Tintin by title:", err.message);
      throw new Error("Error fetching Tintin movies");
    }
  }

  // ─────────────────────────────────────────────
  // Add a new Tintin movie
  // ─────────────────────────────────────────────
  static async postTintin(body) {
    try {
      const { title, picture, synopsis, url, rate, slug } = body;
      const sql = `
        INSERT INTO Tintins (title, picture, synopsis, movie, rating, slug, creation_times_tamp)
        VALUES (?, ?, ?, ?, ?, ?, NOW())
      `;
      const results = await connection.query(sql, [
        title,
        picture,
        synopsis,
        url,
        rate,
        slug,
      ]);
      return results;
    } catch (err) {
      console.error("Error inserting Tintin:", err.message);
      throw new Error("Error adding Tintin movie");
    }
  }

  // ─────────────────────────────────────────────
  // Update a Tintin movie
  // ─────────────────────────────────────────────
  static async putTintin(id, body) {
    try {
      const { title, picture, synopsis, url, rate, slug } = body;
      const sql = `
        UPDATE Tintins
        SET title = ?, picture = ?, synopsis = ?, movie = ?, rating = ?, slug = ?
        WHERE id = ?
      `;
      const results = await connection.query(sql, [
        title,
        picture,
        synopsis,
        url,
        rate,
        slug,
        id,
      ]);
      return results;
    } catch (err) {
      console.error("Error updating Tintin:", err.message);
      throw new Error("Error updating Tintin movie");
    }
  }

  // ─────────────────────────────────────────────
  // Update only the rating of a Tintin movie
  // ─────────────────────────────────────────────
  static async patchMovieRateTintin(id, rate) {
    try {
      const sql = "UPDATE Tintins SET rating = ? WHERE id = ?";
      const results = await connection.query(sql, [rate, id]);
      return results;
    } catch (err) {
      console.error("Error updating Tintin rating:", err.message);
      throw new Error("Error updating Tintin rating");
    }
  }

  // ─────────────────────────────────────────────
  // Delete a Tintin movie
  // ─────────────────────────────────────────────
  static async deleteTintin(id) {
    try {
      const results = await connection.query(
        "DELETE FROM Tintins WHERE id = ?",
        [id],
      );
      if (results.affectedRows === 0) throw new Error("Movie not found");
      return results;
    } catch (err) {
      console.error("Error deleting Tintin:", err.message);
      throw new Error("Error deleting Tintin movie");
    }
  }
}

module.exports = TintinModel;
