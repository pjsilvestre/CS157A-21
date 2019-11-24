const express = require("express");
const router = express.Router();

const database = require("../config/database");

/* GET closet page */
router.get("/", (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/");
  } else {
    const query = `
    SELECT 
      type, attire_name, brand, color, size
    FROM
      user
        JOIN
      owned_by USING (username)
        JOIN
      attire_contained_by_closet USING (closet_id)
        JOIN
      attire USING (attire_id)
    WHERE
      username = '${req.user.username}';`;

    database.query(query, (error, results) => {
      if (error) {
        let messages = { error: error };
        res.render("closet", { messages });
      } else {
        res.render("closet", { results });
      }
    });
  }
});

module.exports = router;
