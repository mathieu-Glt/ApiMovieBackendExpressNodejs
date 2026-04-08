const csrf = require("csrf-token");

const verifyCsrf = async (req, res, next) => {
  try {
    const token = req.headers["x-csrf-token"];

    if (!token) {
      return res.status(403).json({ msg: "Token CSRF manquant" });
    }

    const valid = await csrf.verify(process.env.SECRET_CSRF, token);

    if (!valid) {
      return res.status(403).json({ msg: "Token CSRF invalide" });
    }

    next();
  } catch (error) {
    return res.status(403).json({ msg: "Erreur de vérification CSRF" });
  }
};

module.exports = verifyCsrf;
