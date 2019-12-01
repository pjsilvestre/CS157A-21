const express = require('express');
const router = express.Router();

const database = require('../config/database');

/* GET remove-outfit page */
router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    try {
      const username = req.user.username;
      const closetQuery = `SELECT * FROM closet JOIN owned_by USING (closet_id) WHERE username = '${username}';`;
      database.query(closetQuery, (error, closets) => {
        if (error) {
          throw error;
        } else {
          closets = JSON.parse(JSON.stringify(closets));

          const outfitQuery = `
            SELECT 
              outfit_name
            FROM
              user
                JOIN
              owned_by USING (username)
                JOIN
              closet USING (closet_id)
                JOIN
              outfit_contained_by_closet USING (closet_id)
            WHERE
              username = '${username}';`;

          database.query(outfitQuery, (error, outfits) => {
            if (error) {
              throw error;
            } else {
              outfits = JSON.parse(JSON.stringify(outfits));
              res.render('remove-outfit', { closets, outfits });
            }
          });
        }
      });
    } catch (error) {
      res.render('remove-outfit', { messages: error });
    }
  }
});

module.exports = router;
