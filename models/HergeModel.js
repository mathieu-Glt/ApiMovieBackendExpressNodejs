const connection = require("../db/db");

class HergeModel {
  // ─────────────────────────────────────────────
  // Get all Hergé entries
  // ─────────────────────────────────────────────
  static async getAllHerge() {
    try {
      const sql = "SELECT * FROM Herges";

      // Execute the query and wait for results
      const [results] = await connection.query(sql);

      console.log("🚀 ~ HergeModel ~ getAllHerge ~ results:", results[0]);
      return results; // Return array of Hergé entries
    } catch (err) {
      console.error("Error fetching Hergé data:", err.message);
      throw new Error("Error fetching Hergé data");
    }
  }

  // ─────────────────────────────────────────────
  // Get a Hergé entry by ID
  // ─────────────────────────────────────────────
  static async getHergeById(id) {
    try {
      console.log("🚀 ~ HergeModel ~ getHergeById ~ id:", id);

      // Parameterized query to prevent SQL injection
      const sql = "SELECT * FROM Herges WHERE id = ?";
      const [results] = await connection.query(sql, [id]);

      console.log("🚀 ~ HergeModel ~ getHergeById ~ results:", results);
      return results.length > 0 ? results[0] : null; // Return first match or null
    } catch (err) {
      console.error("Error fetching Hergé by ID:", err.message);
      throw new Error("Error fetching Hergé data");
    }
  }
}

module.exports = HergeModel;
