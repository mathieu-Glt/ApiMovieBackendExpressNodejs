// information de connexion vers la base de données en développpemnt

module.exports = {
  db: {
    host: process.env.HOST_DB,
    database: process.env.DATABASE_DB,
    port: process.env.PORT_DB,
    user: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
  },
  token: {
    secret: process.env.SECRET_TOKEN,
  },
  portApp: {
    port: process.env.PORT,
  },
};

// information de connexion vers la base de données en production
// module.exports = {
// 	db: {
// 		host: "localhost",
// 		type: "mariadb",
// 		port: "3306",
// 		database: "zvwz4070_db",
// 		user: "zvwz4070_user22",
// 		password: "tintin1985#"
// 	},
// token: {
// 	secret: "pitichat"
// }
// }
