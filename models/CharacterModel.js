const connection = require("../db/db");

class CharacterModel {
  // ─────────────────────────────────────────────
  // Get all Tintin characters
  // ─────────────────────────────────────────────
  static async getAllCharacters() {
    try {
      const sql = "SELECT * FROM Series";
      const [results] = await connection.query(sql);
      console.log("🚀 ~ CharacterModel ~ getAllCharacters results:", results);
      return results;
    } catch (err) {
      console.error("Error fetching characters:", err.message);
      throw new Error("Error fetching characters");
    }
  }

  // ─────────────────────────────────────────────
  // Get a Tintin character by ID
  // ─────────────────────────────────────────────
  static async getCharacterById(id) {
    console.log("🚀 ~ CharacterModel ~ getCharacterById ~ id:", id);
    try {
      const sql = "SELECT * FROM Series WHERE id = ?";
      const [results] = await connection.query(sql, [id]);
      console.log("🚀 ~ CharacterModel ~ getCharacterById results:", results);
      return results.length > 0 ? results[0] : null;
    } catch (err) {
      console.error("Error fetching character by ID:", err.message);
      throw new Error("Error fetching character by ID");
    }
  }

  // ─────────────────────────────────────────────
  // Get a Tintin character by name
  // ─────────────────────────────────────────────
  static async getTintinByName(name) {
    console.log("🚀 ~ CharacterModel ~ getTintinByName ~ name:", name);
    try {
      const sql = "SELECT * FROM Series WHERE nom = ?";
      const [results] = await connection.query(sql, [name]);
      console.log("🚀 ~ CharacterModel ~ getTintinByName results:", results);
      return results.length > 0 ? results[0] : null;
    } catch (err) {
      console.error("Error fetching character by name:", err.message);
      throw new Error("Error fetching character by name");
    }
  }

  // ─────────────────────────────────────────────
  // Update a Tintin character
  // ─────────────────────────────────────────────
  static async putCharacter(id, body) {
    console.log("🚀 ~ CharacterModel ~ putCharacter ~ id:", id);
    console.log("🚀 ~ CharacterModel ~ putCharacter ~ body:", body);

    const {
      nom,
      prenom,
      picture,
      profession,
      personnage,
      personnage_suite,
      slug,
    } = body;

    try {
      const sql =
        "UPDATE Series SET nom=?, prenom=?, picture=?, profession=?, personnage=?, personnage_suite=?, slug=? WHERE id=?";
      const [results] = await connection.query(sql, [
        nom,
        prenom,
        picture,
        profession,
        personnage,
        personnage_suite,
        slug,
        id,
      ]);
      console.log("🚀 ~ CharacterModel ~ putCharacter results:", results);
      return results;
    } catch (err) {
      console.error("Error updating character:", err.message);
      throw new Error("Error updating character");
    }
  }

  // ─────────────────────────────────────────────
  // Insert a new Tintin character
  // ─────────────────────────────────────────────
  static async postCharacter(body) {
    console.log("🚀 ~ CharacterModel ~ postCharacter ~ body:", body);

    const {
      nom,
      prenom,
      picture,
      profession,
      personnage,
      personnage_suite,
      slug,
    } = body;

    try {
      const sql =
        "INSERT INTO Series (nom, prenom, picture, profession, personnage, personnage_suite, slug, creation_times_tamp) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";
      const [results] = await connection.query(sql, [
        nom,
        prenom,
        picture,
        profession,
        personnage,
        personnage_suite,
        slug,
      ]);
      console.log("🚀 ~ CharacterModel ~ postCharacter results:", results);
      return results;
    } catch (err) {
      console.error("Error inserting character:", err.message);
      throw new Error("Error inserting character");
    }
  }

  // ─────────────────────────────────────────────
  // Get a Tintin character by slug
  // ─────────────────────────────────────────────
  static async getCharacterBySlug(slug) {
    console.log("🚀 ~ CharacterModel ~ getCharacterBySlug ~ slug:", slug);
    try {
      const sql = "SELECT * FROM Series WHERE slug = ?";
      const [results] = await connection.query(sql, [slug]);
      console.log("🚀 ~ CharacterModel ~ getCharacterBySlug results:", results);
      return results.length > 0 ? results[0] : null;
    } catch (err) {
      console.error("Error fetching character by slug:", err.message);
      throw new Error("Error fetching character by slug");
    }
  }

  // ─────────────────────────────────────────────
  // Delete a Tintin character by ID
  // ─────────────────────────────────────────────
  static async deleteCharacterById(id) {
    console.log("🚀 ~ CharacterModel ~ deleteCharacterById ~ id:", id);
    try {
      const sql = "DELETE FROM Series WHERE id = ?";
      const [results] = await connection.query(sql, [id]);
      console.log(
        "🚀 ~ CharacterModel ~ deleteCharacterById results:",
        results,
      );
      return results;
    } catch (err) {
      console.error("Error deleting character:", err.message);
      throw new Error("Error deleting character");
    }
  }
}

module.exports = CharacterModel;
