//TODO: remove-attire.pug
const express = require("express");
const router = express.Router();

const database = require("../config/database");

/* GET remove-attire page */
router.get("/", (req, res) => {
	if (!req.isAuthenticated()) {
		res.redirect("/");
	  } 
	else {
		const username = req.user.username;
		const closetQuery = `SELECT * FROM closet JOIN owned_by USING (closet_id) WHERE username = '${username}';`;
		database.query(closetQuery, (error, closets) => {
		  if (error) {
			throw error;
		  } 
		  else {
			closets = JSON.parse(JSON.stringify(closets));
		  }
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
	            username = '${username}';`;

	      database.query(query, (error, attires) => {
	       if (error) {
	        let messages = { error: error };
	        res.redirect("/closet", { messages });
		    } 
		    else {
		     attires = JSON.parse(JSON.stringify(attires));
	         res.render("remove-attire", { closets, attires });
	        }
	     });
      }); 
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