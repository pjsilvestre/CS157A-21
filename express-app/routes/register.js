const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const database = require("../config/database");

const saltRounds = 10;

/* GET register page. */
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("register");
  }
});

/* POST register page. */
router.post("/", async (req, res) => {
  const hashed_password = await bcrypt.hashSync(req.body.password, saltRounds);

  const query = `INSERT INTO user VALUES ('${req.body.username}', '${hashed_password}');`;

  database.query(query, error => {
    if (error) {
      console.log(error);
      res.render("register", { errorMessage: "Username already taken." });
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = router;
