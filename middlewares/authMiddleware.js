const jwt = require("jsonwebtoken");
// const secret = 'pitichat';
// middleware permettant de contrôler la validité du token
const withAuth = (req, res, next) => {
  // on récupère les information du token stockées dans la partie headers de la requete axios
  // const token = req.headers['x-access-token'];
  // const token = req.headers.authorization.split(' ')[1];
  //   console.log("Authorization header:", req.headers["authorization"]);

  //const token = req.headers["x-access-token"];
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  console.log("token", token);
  // si pas de token, c'est mort
  if (token === undefined) {
    res.json({ status: 404, msg: "Not token" });
  } else {
    //si il y a un token on vérifie qu'il est bon
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decode) => {
      if (err) {
        // mauvais token !
        res.json({ status: 401, msg: "Warning token expired" });
      } else {
        // bon token on passe à la suite

        // le token est bon, je peux récupérer l'id de l'utilisateur dans le token
        // on avait enregister celui-ci lors du login
        // je le stock dans le req de la fonction suivante
        console.log("decode", decode);
        req.id = decode.payload.id;
        // console.log("", req.id)
        // console.log("decode", decode.payload.id)
        next();
      }
    });
  }
};
// on export le middleware
module.exports = withAuth;
