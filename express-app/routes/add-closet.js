const express = require("express");
const router = express.Router();

const database = require("../config/database");

/* GET  add-closet page */

router.get("/", (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("add-closet");
  }
});

module.exports = router;
