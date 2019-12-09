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
      const closetQuery = `
        SELECT 
          * 
        FROM 
          closet 
            JOIN 
          owned_by USING (closet_id) 
        WHERE 
          username = '${username}';`;

      database.query(closetQuery, (error, closets) => {
        if (error) {
          let messages = { error: error };
          res.render('index', { user: req.user, messages });
        } else if (closets.length === 0) {
          let messages = { error: 'No closets to remove outfits from!' };
          res.render('index', { user: req.user, messages });
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
              let messages = { error: error.message };
              res.render('index', { user: req.user, messages });
            } else if (outfits.length === 0) {
              let messages = { error: 'No outfits to remove!' };
              res.render('index', { user: req.user, messages });
            } else {
              outfits = JSON.parse(JSON.stringify(outfits));
              res.render('remove-outfit', { closets, outfits });
            }
          });
        }
      });
    } catch (error) {
      let messages = { error: error.message };
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
      WHERE 
        outfit_name = '${outfit_name}';`;

    const removeOutfitFromClosetQuery = `
      DELETE FROM outfit_contained_by_closet 
      WHERE 
        outfit_name = '${outfit_name}';`;

    const removeOutfitFromIsComposedOfQuery = `
      DELETE FROM is_composed_of
      WHERE 
        outfit_name = '${outfit_name}';`;

    const removeOutfitFromWornByQuery = `
      SET SQL_SAFE_UPDATES=0;
      DELETE FROM worn_by
      WHERE 
        outfit_name = '${outfit_name}';
      SET SQL_SAFE_UPDATES=1;`;

    const removeOutfitQuery = `${removeOutfitFromOutfitQuery} 
      ${removeOutfitFromClosetQuery} ${removeOutfitFromIsComposedOfQuery}
      ${removeOutfitFromWornByQuery}`;

    try {
      database.query(removeOutfitQuery, error => {
        if (error) {
          let messages = { error: error.message };
          res.render('index', { user: req.user, messages });
        } else {
          res.redirect('closet');
        }
      });
    } catch (error) {
      let messages = { error: error.message };
      res.render('index', { user: req.user, messages });
    }
  }
});

module.exports = router;
