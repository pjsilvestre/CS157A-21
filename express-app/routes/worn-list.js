//TODO: worn-list.pug
const express = require("express");
const router = express.Router();

const database = require("../config/database");

/* GET worn list page */
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    try {
    	
      const query = `
            SELECT 
                outfit_name, date
            FROM
                worn_by
            WHERE
            username = '${req.user.username}';`;

      database.query(query, (err, results) => {
        if (err) throw err;
        res.render("worn-list", { user: req.user, results: results });
      });
    } catch (err) {
      console.error(err.stack);
      res.redirect("/index");
    }
  } else {
    res.redirect("/");
  }
});

      

module.exports = router;