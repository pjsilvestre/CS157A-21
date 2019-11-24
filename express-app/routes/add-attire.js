const express = require("express");
const router = express.Router();

const database = require("../config/database");

/* GET add-attire page */
router.get("/", (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("add-attire");
  }
});

/* POST add-attire page, redirecting to closet*/
router.post("/", (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/");
  } else {
    const username = req.user.username;
    const attire_id = Date.now();
    const type = req.body.type;
    const attire_name = req.body.name;
    const brand = req.body.brand;
    const color = req.body.color;
    const size = req.body.size;

    try {
      let insertAttireIntoAttireQuery = `INSERT INTO attire VALUES (
        '${attire_id}',
        '${type}',
        '${attire_name}',
        '${brand}',
        '${color}',
        '${size}');`;

      database.query(insertAttireIntoAttireQuery, error => {
        if (error) {
          throw error;
        }
      });

      let selectClosetIDQuery = `SELECT closet_id FROM owned_by WHERE username='${username}';`;

      database.query(selectClosetIDQuery, (error, results) => {
        if (error) {
          throw error;
        } else {
          let closet_id = results[0].closet_id;

          let insertAttireIntoClosetQuery = `INSERT INTO attire_contained_by_closet VALUES ('${attire_id}', '${closet_id}');`;

          database.query(insertAttireIntoClosetQuery, error => {
            if (error) {
              throw error;
            }
          });
        }
      });

      res.redirect("/closet");
    } catch (error) {
      res.render("add-attire"), { messages: error };
    }
  }
});

module.exports = router;
