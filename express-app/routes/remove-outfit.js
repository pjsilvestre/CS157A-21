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
              outfit_name, closet_id
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
      let messages = { error: error };
      res.render('index', { user: req.user, messages });
    }
  }
});

/* POST remove-outfit page, redirecting closet */
router.post('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    const outfit_name = req.body.outfit_name;

    const removeOutfitFromOutfitQuery = `
      DELETE FROM outfit 
      WHERE outfit_name = '${outfit_name}';`;

    const removeOutfitFromClosetQuery = `
      DELETE FROM outfit_contained_by_closet 
      WHERE outfit_name = '${outfit_name}';`;

    const removeOutfitFromIsComposedOfQuery = `
    DELETE FROM is_composed_of
    WHERE outfit_name = '${outfit_name}';`;

    const query = `${removeOutfitFromOutfitQuery} ${removeOutfitFromClosetQuery} ${removeOutfitFromIsComposedOfQuery}`;

    try {
      database.query(query, error => {
        if (error) {
          throw error;
        } else {
          res.redirect('closet');
        }
      });
    } catch (error) {
      let messages = { error: error };
      res.render('index', { user: req.user, messages });
    }
  }
});

module.exports = router;
