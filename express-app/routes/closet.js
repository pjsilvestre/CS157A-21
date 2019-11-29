const express = require("express");
const router = express.Router();

const database = require("../config/database");

/* GET closet page */
router.get("/", (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/");
  } else {
    try {
      const closetQuery = `
        SELECT 
          * 
        FROM closet 
          JOIN owned_by USING (closet_id) 
        WHERE username = '${req.user.username}';`;

      database.query(closetQuery, (error, closets) => {
        if (error) {
          throw error;
        } else {
          const attireQuery = `
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
              username = '${req.user.username}' AND closet_id = '${closets[0].closet_id}';`;

          database.query(attireQuery, (error, attire) => {
            if (error) {
              throw error;
            } else {
              attire = JSON.parse(JSON.stringify(attire));
              res.render("closet", { closets, attire });
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
      let messages = { error: error };
      res.render("closet", { messages });
    }
  }
});

/* GET closet page, depending on a chosen closet */
router.post("/", (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/");
  } else {
    try {
      // set the first closet in the closet-selector to be the chosen closet
      let closets = [];
      let chosenCloset = JSON.parse(req.body.closet);
      closets.push(chosenCloset);

      const closetQuery = `
        SELECT 
          * 
        FROM closet 
          JOIN owned_by USING (closet_id) 
        WHERE username = '${req.user.username}';`;

      database.query(closetQuery, (error, allClosets) => {
        if (error) {
          throw error;
        } else {
          allClosets = JSON.parse(JSON.stringify(allClosets));
          
          // add all other other closets to closets
          for (const closet of allClosets) {
            if (closet.closet_id !== chosenCloset.closet_id) {
              closets.push(closet);
            }
          }

          const attireQuery = `
            SELECT
              type, attire_name, brand, color, size
            FROM
              user
                JOIN
              owned_by USING (username)
                JOIN
              closet USING (closet_id)
                JOIN
              attire_contained_by_closet USING (closet_id)
                JOIN
              attire USING (attire_id)
            WHERE
              username = '${req.user.username}' AND location = '${chosenCloset.location}'`;

          database.query(attireQuery, (error, attire) => {
            if (error) {
              throw error;
            } else {
              attire = JSON.parse(JSON.stringify(attire));
              res.render("closet", { closets, attire });
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
      let messages = { error: error };
      res.render("closet", { messages });
    }
  }
});

module.exports = router;
