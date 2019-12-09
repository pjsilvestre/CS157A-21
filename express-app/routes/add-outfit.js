const express = require('express');
const router = express.Router();

const database = require('../config/database');

/* GET add-outfit page */
router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    try {
      const username = req.user.username;
      let closetQuery = `
        SELECT 
          * 
        FROM 
          closet 
            JOIN 
          owned_by USING (closet_id) 
        WHERE username = '${username}';`;

      database.query(closetQuery, (error, closets) => {
        if (error) {
          throw error;
        } else {
          closets = JSON.parse(JSON.stringify(closets));

          let attireQuery = `
            SELECT 
              location, attire_id, attire_name
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
            WHERE username = '${username}';`;

          database.query(attireQuery, (error, attire) => {
            if (error) {
              throw error;
            } else {
              attire = JSON.parse(JSON.stringify(attire));
              res.render('add-outfit', { closets, attire });
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

/* POST add-outfit page, redirecting to closet */
router.post('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    const user = req.user;
    const closet = JSON.parse(req.body.closet);
    const closet_id = closet.closet_id;
    const outfit_name = req.body.name;
    const season = req.body.season;
    const attireChoices = req.body.attireChoices;
    const tag = req.body.tag;

    let insertOutfitIntoOutfitQuery = `
      INSERT INTO outfit VALUES (
        '${outfit_name}', 
        '${season}',`;

    if (tag === undefined) {
      insertOutfitIntoOutfitQuery += ` NULL);`;
    } else {
      insertOutfitIntoOutfitQuery += ` '${tag}');`;
    }

    const insertOutfitIntoClosetQuery = `
      INSERT INTO outfit_contained_by_closet VALUES (
        '${outfit_name}', 
        '${closet_id}');`;

    let insertOutfitIntoIsComposedOfQuery = '';

    if (Array.isArray(attireChoices)) {
      attireChoices.forEach(attire_id => {
        insertOutfitIntoIsComposedOfQuery += ` 
        INSERT INTO is_composed_of VALUES (
          '${outfit_name}', 
          '${attire_id}');`;
      });
    } else {
      insertOutfitIntoIsComposedOfQuery = `
        INSERT INTO is_composed_of VALUES (
          '${outfit_name}', 
          '${attireChoices}');`;
    }

    const query = `
      ${insertOutfitIntoOutfitQuery}
      ${insertOutfitIntoClosetQuery}
      ${insertOutfitIntoIsComposedOfQuery}`;

    try {
      if (attireChoices === undefined) {
        const error = 'No pieces selected!';
        throw error;
      }

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
