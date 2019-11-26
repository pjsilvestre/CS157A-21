//TODO: remove-attire.pug
const express = require("express");
const router = express.Router();

const database = require("../config/database");

/* GET remove-attire page */
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
	const query = `
	            SELECT 
	                attire_id
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
	    res.render("edit-attire", { results: results });
	  }
	});
  } else {
	res.redirect("/");
	}
});

/* POST remove-attire page. */
router.post("/", (req, res) => {
  if (req.isAuthenticated()) {
    const attireID = req.body.attireID;
    
    let query = `DELETE FROM attire
                 WHERE attire_id=${attireID};`;

    database.query(query, error => {
      if (error) {
        let messages = { error: error };
        res.render("remove-attire", { messages });
      } else {
        res.redirect("/closet");
      }
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;