const express = require("express");
const router = express.Router();

const database = require("../config/database");

/* GET add-attire page */
router.get("/", (req, res, next) => {
  if (req.isAuthenticated()) {
      res.render('add-attire')
  } else {
    res.render('index');
  }
});

/* POST add-attire page, redirecting to closet*/

module.exports = router;