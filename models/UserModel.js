const connection = require("../db/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class UserModel {
  // ─────────────────────────────────────────────
  // Get a user by ID
  // ─────────────────────────────────────────────
  static async getUserById(id) {
    try {
      console.log("🚀 ~ UserModel ~ getUserById ~ id:", id);

      const [rows] = await connection.query(
        "SELECT * FROM Users WHERE id = ?",
        [id],
      );

      return rows.length > 0 ? rows[0] : null;
    } catch (err) {
      console.error("Error fetching user by ID:", err.message);
      throw new Error("Error fetching user data");
    }
  }

  // ─────────────────────────────────────────────
  // Get the role of a user by ID
  // ─────────────────────────────────────────────
  static async getRoleUser(userId) {
    try {
      console.log("🚀 ~ UserModel ~ getRoleUser ~ userId:", userId);

      const [rows] = await connection.query(
        "SELECT role FROM Users WHERE id = ?",
        [userId],
      );

      if (rows.length === 0) return null;

      return rows[0].role;
    } catch (err) {
      console.error("Error fetching user role:", err.message);
      throw new Error("Error fetching user role data");
    }
  }

  // ─────────────────────────────────────────────
  // Get a user by email
  // ─────────────────────────────────────────────
  static async getUserByEmail(email) {
    try {
      console.log("🚀 ~ UserModel ~ getUserByEmail ~ email:", email);

      const [rows] = await connection.query(
        "SELECT * FROM Users WHERE email = ?",
        [email],
      );

      return rows.length > 0 ? rows[0] : null;
    } catch (err) {
      console.error("Error fetching user by email:", err.message);
      throw new Error("Error fetching user data");
    }
  }

  // ─────────────────────────────────────────────
  // Create a new user
  // ─────────────────────────────────────────────
  static async saveOneUser(body) {
    try {
      console.log("🚀 ~ UserModel ~ saveOneUser ~ body:", body);

      const { firstname, lastname, email, password } = body;
      const hash = await bcrypt.hash(password, saltRounds);

      const sql = `
        INSERT INTO Users (firstName, lastName, email, hashPassword, role, creation_times_tamp)
        VALUES (?, ?, ?, ?, "user", NOW())
      `;

      const results = await connection.query(sql, [
        firstname,
        lastname,
        email,
        hash,
      ]);

      return results;
    } catch (err) {
      console.error("Error creating new user:", err.message);
      throw new Error("Error saving new user");
    }
  }

  // ─────────────────────────────────────────────
  // Compare user password with hashed password
  // ─────────────────────────────────────────────
  static async comparePassword(inputPassword, hashedPassword) {
    try {
      return await bcrypt.compare(inputPassword, hashedPassword);
    } catch (err) {
      console.error("Error comparing password:", err.message);
      throw new Error("Error validating user password");
    }
  }
}

module.exports = UserModel;
