/**
 * @fileoverview Point d'entrée principal du serveur Express
 * Configuration des middlewares de sécurité, parsing, sessions et routes
 */

/**
 *
 */

const fs = require("fs");

// ─────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────

const express = require("express");
/**
 * Express est le framework web Node.js utilisé pour créer le serveur HTTP.
 * Il gère le routing, les middlewares et les réponses HTTP.
 */

const path = require("path");
/**
 * Module natif Node.js pour manipuler les chemins de fichiers
 * de manière compatible cross-platform (Windows, Linux, Mac).
 */

//require("dotenv").config();
require("dotenv-flow").config();
/**
 * dotenv charge les variables d'environnement depuis le fichier .env
 * dans process.env. Cela évite de hardcoder des secrets dans le code.
 * Toujours appeler en tout premier avant d'utiliser process.env.
 */

const helmet = require("helmet");
/**
 * Helmet sécurise automatiquement les headers HTTP des réponses.
 * Il active plusieurs protections d'un coup :
 *
 * | Header                    | Protection                                              |
 * |---------------------------|---------------------------------------------------------|
 * | Content-Security-Policy   | Bloque scripts/ressources non autorisés (XSS)           |
 * | X-Frame-Options           | Empêche l'intégration dans une <iframe> (clickjacking)  |
 * | X-Content-Type-Options    | Empêche le navigateur de deviner le type MIME           |
 * | Strict-Transport-Security | Force le HTTPS en production                            |
 * | X-DNS-Prefetch-Control    | Contrôle la résolution DNS anticipée                    |
 * | Referrer-Policy           | Limite les infos envoyées dans le header Referer        |
 * | Supprime X-Powered-By     | Cache le fait que le serveur tourne sur Express         |
 */

const cors = require("cors");
/**
 * CORS (Cross-Origin Resource Sharing) contrôle quels domaines externes
 * peuvent faire des requêtes vers ce serveur.
 * Sans configuration, Express accepte toutes les origines (*), ce qui est
 * dangereux en production. On restreint ici à une whitelist d'origines autorisées.
 */

const xss = require("xss");
/**
 * La librairie xss sanitize les données entrantes pour neutraliser
 * les attaques XSS (Cross-Site Scripting).
 * Elle échappe les balises HTML dangereuses comme <script>, onclick, etc.
 * Un middleware global l'applique automatiquement sur tout req.body.
 */

const csrf = require("csrf-token");
/**
 * csrf-token génère et vérifie des tokens CSRF (Cross-Site Request Forgery).
 * Le CSRF est une attaque où un site malveillant trompe un utilisateur connecté
 * pour qu'il effectue des actions non voulues sur notre API.
 * Le token est généré côté serveur, envoyé au client, puis renvoyé
 * dans chaque requête sensible (POST, PUT, DELETE) pour validation.
 */

const session = require("express-session");
/**
 * express-session gère les sessions utilisateur côté serveur.
 * Une session est un espace de stockage temporaire associé à un cookie
 * envoyé au navigateur. Permet de garder un utilisateur connecté
 * entre plusieurs requêtes HTTP (qui sont sans état par défaut).
 */

const rateLimit = require("express-rate-limit");
/**
 * express-rate-limit protège contre les attaques par force brute
 * et le flooding en limitant le nombre de requêtes par IP sur une période.
 * Ex: max 100 requêtes / 15 minutes sur les routes générales,
 * et seulement 10 tentatives / 15 minutes sur les routes d'authentification.
 */

const fileUpload = require("express-fileupload");
/**
 * express-fileupload est un middleware qui parse les requêtes multipart/form-data
 * pour permettre l'upload de fichiers.
 * Les fichiers uploadés sont accessibles via req.files dans les controllers.
 * createParentPath: true crée automatiquement les dossiers de destination si absents.
 */

const mysql = require("promise-mysql");
/**
 * promise-mysql est un wrapper de mysql qui retourne des Promises
 * au lieu d'utiliser des callbacks. Permet d'utiliser async/await
 * pour les requêtes SQL.
 */

const database = require("./db/db");
/**
 * Module interne qui exporte la connexion à la base de données MySQL.
 * Centralise la configuration de connexion (host, user, password, database).
 */

const config = require("./config");
/**
 * Fichier de configuration interne qui expose les paramètres
 * de l'application (DB, ports, etc.) en lisant les variables d'environnement.
 */

// ─────────────────────────────────────────────
// INITIALISATION EXPRESS
// ─────────────────────────────────────────────

const app = express();

// ─────────────────────────────────────────────
// MIDDLEWARES DE SÉCURITÉ (en premier)
// ─────────────────────────────────────────────

// 1. Helmet — sécurisation des headers HTTP
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
// 2. CORS — restriction des origines autorisées
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://ton-vrai-domaine.com"]
    : ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      // autorise les requêtes sans origin (ex: Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `L'origine ${origin} n'est pas autorisée par CORS`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // permet l'envoi de cookies/session
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

// 3. Rate limiting global — protection contre le flooding
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // fenêtre de 15 minutes
  max: 100, // max 100 requêtes par IP sur cette fenêtre
  message: { msg: "Trop de requêtes, veuillez réessayer plus tard." },
});
app.use("/api/", globalLimiter);

// 4. Rate limiting strict sur l'authentification — protection brute force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // fenêtre de 15 minutes
  max: 10, // max 10 tentatives de connexion par IP
  message: {
    msg: "Trop de tentatives de connexion, réessayez dans 15 minutes.",
  },
});
app.use("/api/auth", authLimiter);

// ─────────────────────────────────────────────
// PARSING DES REQUÊTES
// ─────────────────────────────────────────────

app.use(express.json()); // parse le body JSON
app.use(express.urlencoded({ extended: false })); // parse les formulaires HTML

// ─────────────────────────────────────────────
// SESSION
// ─────────────────────────────────────────────

app.use(
  session({
    secret: process.env.SECRET, // clé de signature du cookie de session
    resave: false, // ne re-sauvegarde pas la session si non modifiée
    saveUninitialized: true, // sauvegarde les sessions non initialisées
    cookie: {
      maxAge: 3600000, // durée de vie : 1 heure en ms
      httpOnly: true, // cookie inaccessible depuis JS côté client
      secure: process.env.NODE_ENV === "production", // HTTPS uniquement en prod
      //sameSite: "strict", // protection CSRF supplémentaire
      sameSite: "lax", // protection CSRF supplémentaire
    },
  }),
);

// ─────────────────────────────────────────────
// UPLOAD DE FICHIERS
// ─────────────────────────────────────────────

app.use(
  fileUpload({
    createParentPath: true, // crée les dossiers de destination si absents
  }),
);

// ─────────────────────────────────────────────
// SANITIZATION XSS (après le parsing)
// ─────────────────────────────────────────────

app.use((req, res, next) => {
  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      req.body[key] = xss(req.body[key]); // échappe les balises HTML dangereuses
    }
  }
  next();
});

// ─────────────────────────────────────────────
// CSRF — génération du token
// ─────────────────────────────────────────────

app.get("/csrf-token", (req, res, next) => {
  csrf.create(process.env.SECRET_CSRF).then((token) => {
    res.status(200).json({
      status: 200,
      msg: "Token CSRF généré",
      csrfToken: token,
    });
  });
});

// ─────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────

// const tintinRoutes = require("./routes/tintin.routes");
// const userRoutes = require("./routes/user.routes");
// const favoriesRoutes = require("./routes/favories.routes");
// const charactersRoutes = require("./routes/character.routes");
// const hergeRoutes = require("./routes/herge.routes");
// const authRoutes = require("./routes/authRoutes");
// const persoTintinRoutes = require("./routes/persoTintin.routes");

// app.use("/api/users", userRoutes);
// app.use("/api/tintins", tintinRoutes);
// app.use("/api/favories", favoriesRoutes);
// app.use("/api/characters", charactersRoutes);
// app.use("/api/herge", hergeRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/persoTintin", persoTintinRoutes);

// Option A
// Charge automatiquement tous les fichiers du dossier routes/
fs.readdirSync(path.join(__dirname, "routes")).forEach((file) => {
  // On ignore les fichiers qui ne sont pas des .js
  if (!file.endsWith(".js")) return;

  const route = require(`./routes/${file}`);

  // Transforme le nom du fichier en préfixe d'URL
  // ex: tintin.routes.js     → /api/tintin
  // ex: user.routes.js       → /api/user
  // ex: authRoutes.js        → /api/authRoutes
  const routeName = file.replace(".routes.js", "").replace("Routes.js", "");

  app.use(`/api/${routeName}`, route);
  console.log(`Route chargée : /api/${routeName}`);
});

app.use("/images", express.static("images"));
app.use(express.static(path.join(__dirname, "build"))); // sert le build React

//Option B
// ─────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────
// const routes = require("./routes/index");
// routes.forEach(({ path, router }) => app.use(path, router));

// ─────────────────────────────────────────────
// DÉMARRAGE DU SERVEUR
// ─────────────────────────────────────────────

const PORT = process.env.PORT;

if (process.env.NODE_ENV === "development") {
  console.log("MODE : Développement");
  app.listen(PORT, () => {
    console.log(
      `Server mode development is listening on http://localhost:${PORT}`,
    );
  });
} else if (process.env.NODE_ENV === "test") {
  console.log("En mode TEST : Le serveur ne démarre pas.");
} else if (process.env.NODE_ENV === "production") {
  console.log("MODE : Production");
  app.listen(PORT, () => {
    console.log(
      `Server mode production is listening on http://localhost:${PORT}`,
    );
  });
} else {
  console.log("NODE_ENV invalide. Démarrage en mode par défaut.");
  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
}

module.exports = app; // Export pour les tests Jest/Supertest
