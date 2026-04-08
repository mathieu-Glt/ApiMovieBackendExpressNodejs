const request = require("supertest");
const app = require("../server"); // Assurez-vous que le chemin est correct

// test de la route /api/tintins/unknowuser/movies
describe("GET api/tintins/unknowuser/movies", () => {
  it("should return 200 and a list of Tintin movies", async () => {
    // Modifier l'URL pour inclure le préfixe /api/tintins
    const response = await request(app).get("/api/tintins/unknowuser/movies");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", 200);
    expect(response.body).toHaveProperty("msg", "Collection found");
    expect(Array.isArray(response.body.results)).toBe(true);
    expect(response.body.results.length).toBeGreaterThan(0);

    // Exemple de test sur les données :
    const movie = response.body.results[0];
    expect(movie).toHaveProperty("id");
    expect(movie).toHaveProperty("title");
    expect(movie).toHaveProperty("synopsis");
  });
});

describe("GET /api/tintins/:id", () => {
  it("should return 200 and the correct Tintin movie data", async () => {
    const movieId = 1; // Remplace par l'ID que tu veux tester (ici ID = 1)

    const response = await request(app).get(`/api/tintins/${movieId}`);

    expect(response.statusCode).toBe(200); // Vérifie que le statut de la réponse est 200 OK
    expect(response.body.status).toBe(200); // Vérifie que le statut du body est 200
    expect(response.body.msg).toBe("tintin found"); // Vérifie le message du body
    expect(Array.isArray(response.body.results)).toBe(true); // Vérifie que le champ "results" est un tableau
    expect(response.body.results.length).toBeGreaterThan(0); // Vérifie qu'il y a au moins un résultat

    const movie = response.body.results[0];
    // Vérifie les propriétés spécifiques du film
    expect(movie).toHaveProperty("id", movieId); // Vérifie que l'id du film est bien celui attendu
    expect(movie).toHaveProperty("title");
    expect(movie).toHaveProperty("picture");
    expect(movie).toHaveProperty("synopsis");
    expect(movie).toHaveProperty("movie"); // Vérifie que la vidéo est présente
    expect(movie).toHaveProperty("rating");
    expect(movie).toHaveProperty("slug");
    expect(movie).toHaveProperty("creation_times_tamp");
  });
});

describe("POST /api/tintins/tintin/save", () => {
  let adminToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxMDcsImVtYWlsIjoibWF0aGlldS5naWxsZXRAaG90bWFpbC5mciIsImZpcnN0TmFtZSI6Ik1hdGhpZXUiLCJsYXN0TmFtZSI6IkdJTExFVCIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE3NDQzMDQwNjZ9.FaNerSbDKPjxaqWS_mtpTkFlIWUuYIVwhOS2QYeZCsc";
  // let userToken;

  const newMovie = {
    title: "Tintin en Amérique",
    picture: "https://example.com/image.jpg",
    synopsis: "Tintin part à la conquête de l'Antartique.",
    url: "https://example.com/movie",
    rate: "4",
    slug: "tintin-conquête-en-amérique",
  };

  // beforeAll(async () => {
  //   const adminRes = await request(app).post("/api/users/login").send({
  //     email: "mathieu.gillet@hotmail.fr",
  //     password: "Mg!2023@1985/*", // ← attention à la clé ici (password, pas hashedPassword)
  //   });
  //   adminToken = adminRes.body.token;
  // });

  it("✅ should allow admin to save a new Tintin movie", async () => {
    const res = await request(app)
      .post("/api/tintins/tintin/save")
      .set("x-access-token", `${adminToken}`)
      .send(newMovie);

    console.log(res.body);

    expect(res.status).toBe(201);
    expect(res.body.status).toBe(201);
    expect(res.body.msg).toContain("The movie has been created !");
    expect(res.body.results.insertId).toBeGreaterThan(0); // Vérification de l'insertId
  });

  // Tests supplémentaires à décommenter plus tard
  /*
  it("❌ should reject non-admin user", async () => {
    const res = await request(app)
      .post("/api/tintin/save")
      .set("Authorization", `Bearer ${userToken}`)
      .send(newMovie);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe(401);
    expect(res.body.msg).toBe("unauthorized !");
  });

  it("❌ should reject request without token", async () => {
    const res = await request(app).post("/api/tintin/save").send(newMovie);

    expect(res.status).toBe(401);
    expect(res.body.msg).toBe("You must be logged in");
  });
  */

  // afterAll(async () => {
  //   const connection = require("../db/db");
  //   await connection.query("DELETE FROM tintin WHERE slug = ?", [
  //     "tintin-conquête-en-amérique",
  //   ]);
  // });
});

describe("PUT /api/tintins/tintin/update/:id", () => {
  let adminToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxMDcsImVtYWlsIjoibWF0aGlldS5naWxsZXRAaG90bWFpbC5mciIsImZpcnN0TmFtZSI6Ik1hdGhpZXUiLCJsYXN0TmFtZSI6IkdJTExFVCIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE3NDQzMDQwNjZ9.FaNerSbDKPjxaqWS_mtpTkFlIWUuYIVwhOS2QYeZCsc";
  // let userToken;
  let movieId = 5; // L'ID du film à tester

  // Données de mise à jour du film
  const updatedMovie = {
    title: "La conquête de Tintin en Antartique",
    picture: "https://examples.com/image.jpg",
    synopsis: "Tintin part à la conquête de l'Antartique.",
    url: "https://example.com/movie",
    rate: 4, // Modifier rate en nombre (plutôt que chaîne de caractères)
    slug: "tintin-conquête-en-antartique",
  };

  it("✅ should allow admin to update a Tintin movie", async () => {
    const res = await request(app)
      .put(`/api/tintins/tintin/update/${movieId}`)
      .set("x-access-token", `${adminToken}`)
      .send(updatedMovie);

    // .post("/api/tintins/tintin/save")
    // .set("x-access-token", `${adminToken}`)
    // .send(newMovie);

    console.log(res.body);

    // Assertions pour vérifier que la mise à jour a été effectuée
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(200);
    expect(res.body.msg).toContain("The movie has been updated");
    expect(res.body.results.affectedRows).toBeGreaterThan(0);
  });

  // it("❌ should reject non-admin user", async () => {
  //   const res = await request(app)
  //     .put(`/api/tintins/${movieId}`)
  //     .set("x-access-token", userToken) // Utilisation du token d'un utilisateur non admin
  //     .send(updatedMovie);

  //   console.log(res.body);

  //   expect(res.status).toBe(401);
  //   expect(res.body.status).toBe(401);
  //   expect(res.body.msg).toBe("unauthorized !");
  // });

  it("❌ should return an error if the movie ID does not exist", async () => {
    const invalidMovieId = 9999; // ID non existant
    let adminToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxMDcsImVtYWlsIjoibWF0aGlldS5naWxsZXRAaG90bWFpbC5mciIsImZpcnN0TmFtZSI6Ik1hdGhpZXUiLCJsYXN0TmFtZSI6IkdJTExFVCIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE3NDQzMDQwNjZ9.FaNerSbDKPjxaqWS_mtpTkFlIWUuYIVwhOS2QYeZCsc";
    // let userToken;

    const res = await request(app)
      .put(`/api/tintins/tintin/update/${invalidMovieId}`)
      .set("x-access-token", `${adminToken}`)
      .send(updatedMovie);

    expect(res.status).toBe(404);
    expect(res.body.msg).toBe("Movie not found");
  });
});

describe("DELETE /api/tintins/tintin/delete/:id", () => {
  let adminToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxMDcsImVtYWlsIjoibWF0aGlldS5naWxsZXRAaG90bWFpbC5mciIsImZpcnN0TmFtZSI6Ik1hdGhpZXUiLCJsYXN0TmFtZSI6IkdJTExFVCIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE3NDQzMDQwNjZ9.FaNerSbDKPjxaqWS_mtpTkFlIWUuYIVwhOS2QYeZCsc";

  const movieId = 18; // L'ID du film à tester, ajuster si nécessaire

  it("✅ should allow admin to delete a Tintin movie", async () => {
    const res = await request(app)
      .delete(`/api/tintins/tintin/delete/${movieId}`)
      .set("x-access-token", adminToken); // Passe le token admin

    console.log(res.body); // Pour déboguer

    expect(res.status).toBe(200);
    expect(res.body.msg).toContain("has been deleted");
    expect(res.body.results[0]).toHaveProperty("id", movieId); // Vérifie que le film supprimé est bien celui avec l'ID attendu
  });

  // it("❌ should reject non-admin user", async () => {
  //   const userToken = "TOKEN_USER"; // Remplacer par un token utilisateur non-admin

  //   const res = await request(app)
  //     .delete(`/api/tintins/tintin/delete/${movieId}`)
  //     .set("x-access-token", userToken); // Passe le token utilisateur non-admin

  //   console.log(res.body); // Pour déboguer

  //   expect(res.status).toBe(401);
  //   expect(res.body.status).toBe(401);
  //   expect(res.body.msg).toBe("unauthorized !");
  // });
  // Pas gérer le cas de l 'id non existant pour l'instant
  // it("❌ should return 404 if the movie does not exist", async () => {
  //   const invalidMovieId = 9999; // ID non existant

  //   const res = await request(app)
  //     .delete(`/api/tintins/tintin/delete/${invalidMovieId}`)
  //     .set("x-access-token", adminToken);

  //   console.log(res.body); // Pour déboguer

  //   expect(res.status).toBe(404);
  //   expect(res.body.msg).toBe("Movie not found");
  // });
});
