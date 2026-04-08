const connection = require("../db/db");

class AuthModel {
  // ─────────────────────────────────────────────
  // Verify if a user exists by ID
  // ─────────────────────────────────────────────
  static async getUser(id) {
    console.log("🚀 ~ AuthModel ~ getUser ~ id:", id);

    try {
      // Use parameterized query to prevent SQL injection
      const sql = "SELECT * FROM Users WHERE id = ?";
      const [results] = await connection.query(sql, [id]);

      console.log("🚀 ~ AuthModel ~ getUser results:", results);

      // Return the results (empty array if no user found)
      return results;
    } catch (err) {
      console.error("Error fetching user:", err.message);
      throw new Error("Error fetching user");
    }
  }
}

module.exports = AuthModel;
