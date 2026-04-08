const request = require("supertest");
const app = require("../server"); // Assurez-vous que le chemin est correct
const mysql = require("mysql2");

let connection;

beforeAll(() => {
  connection = mysql.createConnection({
    host: "db.3wa.io",
    user: "mathieugillet",
    password: "379a46404e062e0b0e8b7799b58095a4",
    database: "mathieugillet_api-tintin_cine",
  });

  connection.connect((err) => {
    if (err) {
      console.error("Erreur de connexion à la base de données: " + err.stack);
      return;
    }
    console.log(
      "Connecté à la base de données avec l'ID " + connection.threadId
    );
  });
});

afterAll(() => {
  connection.end();
});

describe("POST /api/users/login", () => {
  it("should login an existing user and return a token", async () => {
    const email = "mathieu.gillet@hotmail.fr";
    const password = "Mg!2023@1985/*"; // Assure-toi que c'est le bon mot de passe

    const response = await request(app)
      .post("/api/users/login")
      .send({ email, password });

    console.log(response.body); // Ajoute un log pour voir la réponse complète

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.status).toBe(200);
    expect(response.body.msg).toBe("Login successful");
  });

  it("should return 404 if email does not exist", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "nonexistent@example.com", password: "any_password" });

    console.log(response.body); // Log de la réponse pour vérifier la sortie

    expect(response.status).toBe(404); // Vérifie que le status est bien 404
    expect(response.body.status).toBe(404);
    expect(response.body.msg).toBe("Email does not exist, please register");
  });

  it("should return 400 if the password is incorrect", async () => {
    const email = "mathieu.gillet@hotmail.fr"; // Un email existant dans la base
    const password = "wrong_password"; // Un mot de passe incorrect

    const response = await request(app)
      .post("/api/users/login")
      .send({ email, password });

    // Vérifie que la réponse a un statut 400
    expect(response.status).toBe(400);
    expect(response.body.status).toBe(400);
    expect(response.body.msg).toBe("Incorrect password");
  });
});
