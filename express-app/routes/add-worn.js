//TODO: add-worn.pug
const express = require('express');
const router = express.Router();

const database = require('../config/database');

/* GET add-worn page */
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
          let messages = { error: 'No closets to choose outfits from!' };
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
              let messages = { error: 'No outfits to choose!' };
              res.render('index', { user: req.user, messages });
            } else {
              outfits = JSON.parse(JSON.stringify(outfits));
              res.render('add-worn', { closets, outfits });
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

/* POST add-worn page*/
router.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const username = req.user.username;
      //TODO: add outfit_name field in add-worn.pug
      const outfit_name = req.body.outfit_name;
      //TODO: add date field in add-worn.pug
      const date = req.body.date;

      //add new worn attire to user's list
      let query = `
        INSERT INTO 
          worn_by 
        SET
          username = '${username}',
          outfit_name = '${outfit_name}',
          date = '${date}';`;

      database.query(query, err => {
        if (err) throw err;
      });
    } catch (err) {
      console.error(err.stack);
      res.redirect('/add-worn');
    } finally {
      res.redirect('/worn-list');
    }
  } else {
    res.redirect('/');
  }
});

module.exports = router;
