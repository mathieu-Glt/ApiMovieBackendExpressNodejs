const connection = require("../db/db");

class PersoModel {
  // ─────────────────────────────────────────────
  // Get all Tintin characters
  // ─────────────────────────────────────────────
  static async getAllPerso() {
    try {
      const sql = "SELECT * FROM Personnages";

      // Execute the query and wait for results
      const [results] = await connection.query(sql);

      console.log("🚀 ~ PersoModel ~ getAllPerso ~ results:", results);
      return results; // Return array of characters
    } catch (err) {
      console.error("Error fetching Tintin characters:", err.message);
      throw new Error("Error fetching Tintin data");
    }
  }

  // ─────────────────────────────────────────────
  // Get a Tintin character by ID
  // ─────────────────────────────────────────────
  static async getPersoById(id) {
    try {
      console.log("🚀 ~ PersoModel ~ getPersoById ~ id:", id);

      // Parameterized query to prevent SQL injection
      const sql = "SELECT * FROM Personnages WHERE id = ?";
      const [results] = await connection.query(sql, [id]);

      console.log("🚀 ~ PersoModel ~ getPersoById ~ results:", results);
      return results.length > 0 ? results[0] : null; // Return first match or null
    } catch (err) {
      console.error("Error fetching Tintin character by ID:", err.message);
      throw new Error("Error fetching Tintin data");
    }
  }
}

module.exports = PersoModel;
