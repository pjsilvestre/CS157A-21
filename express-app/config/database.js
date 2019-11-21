const mysql = require("mysql");

const connection = mysql.createPool({
  connectionLimit: 2,
  host: "localhost",
  user: "root",
  password: "password",
  database: "what_do_i_wear_today"
});

module.exports = connection;
