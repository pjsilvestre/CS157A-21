const express = require("express");
const router = express.Router();

/* GET edit-attire page. */
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("edit-attire");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
