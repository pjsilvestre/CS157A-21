const mysql = require("mysql");

const connection = mysql.createPool({
  connectionLimit: 2,
  host: "localhost",
  user: "root",
  password: "password",
  database: "what_do_i_wear_today",
  multipleStatements: "true"
});
connection.getConnection(function(err, connection) {
  if (err) throw err;
  console.log("mySQL successfully connected!");
})

module.exports = connection;
