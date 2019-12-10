const express = require('express');
const router = express.Router();

const database = require('../config/database');

/* GET friend-list page */
router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
    return;
  } else {
    const username = req.user.username;

    // get all friends' outfits
    const friendOutfitQuery = `
      SELECT 
        username, outfit_name, brand, attire_name
      FROM
        owned_by
            JOIN
        outfit_contained_by_closet USING (closet_id)
            JOIN
        is_composed_of USING (outfit_name)
            JOIN
        attire USING (attire_id)
      WHERE
        username IN (
          SELECT 
            username2 AS 'username'
          FROM
            is_friends_with
          WHERE
            username1 = '${username}')
      ORDER BY
        username,
        outfit_name,
        brand,
        attire_name;`;

    try {
      database.query(friendOutfitQuery, (error, results) => {
        if (error) {
          throw error;
        } else if (results.length === 0) {
          let messages = { error: 'No friends to display!' };
          res.render('index', { user: req.user, messages });
          return;
        } else {
          console.log({ results });
          res.render('friend-list', { user: req.user, results });
        }
      });
    } catch (error) {
      let messages = { error: error.message };
      res.render('index', { user: req.user, messages });
      return;
    }
  }
});

module.exports = router;
