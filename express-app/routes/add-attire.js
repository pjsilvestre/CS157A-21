const express = require("express");
const router = express.Router();

const database = require("../config/database");

/* GET add-attire page */
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("add-attire");
  } else {
    res.redirect("/");
  }
});

/* POST add-attire page, redirecting to closet*/
router.post("/", (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const username = req.user.username;

      const attire_id = Date.now();
      const type = req.body.type;
      const name = req.body.name;
      const brand = req.body.brand;
      const color = req.body.color;
      const size = req.body.size;

      //add attire to attire table
      let query = `INSERT INTO attire VALUES (
        '${attire_id}',
        '${type}',
        '${name}',
        '${brand}',
        '${color}',
        '${size}');`;

      database.query(query, err => {
        if (err) throw err;
      });

      //get user's closet_id
      query = `SELECT closet_id FROM owns WHERE username='${username}';`;

      database.query(query, (err, results) => {
        if (err) throw err;
        let closet_id = results[0].closet_id;

        //associate attire with user's closet
        query = `INSERT INTO closet_contains_attire VALUES ('${closet_id}', '${attire_id}');`;

        database.query(query, (err, results) => {
          if (err) throw err;
          closet_id = results.closet_id;
        });
      });
    } catch (err) {
      console.error(err.stack);
      res.redirect("/add-attire");
    } finally {
      res.redirect("/closet");
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;
