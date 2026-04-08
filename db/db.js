// const mysql = require('mysql');
const mysql = require("mysql2/promise");
const configuration = require("../config");

const pool = mysql.createPool({
  host: configuration.db.host,
  user: configuration.db.user,
  password: configuration.db.password,
  database: configuration.db.database,
  port: configuration.db.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
