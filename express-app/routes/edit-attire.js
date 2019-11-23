const express = require("express");
const router = express.Router();

const database = require("../config/database");

/* GET edit-attire page. */
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
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
        res.redirect("/closet", { messages });
      } else {
        res.render("edit-attire", { results : results });
      }
    });
  } else {
    res.redirect("/");
  }
});

/* POST edit-attire page. */
router.post("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/closet");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
