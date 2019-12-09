const express = require('express');
const router = express.Router();

const database = require('../config/database');

/* GET add-attire page */
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
        WHERE 
          username = '${username}';`;

      database.query(closetQuery, (error, closets) => {
        if (error) {
          throw error;
        } else if (closets.length === 0) {
          let messages = { error: 'Add a closet first!' };
          res.render('index', { user: req.user, messages });
          return;
        } else {
          closets = JSON.parse(JSON.stringify(closets));
          res.render('add-attire', { closets });
        }
      });
    } catch (error) {
      let messages = { error: error };
      res.render('index'), { user: req.user, messages };
    }
  }
});

/* POST add-attire page, redirecting to closet*/
router.post('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    const closet = JSON.parse(req.body.closet);
    const closet_id = closet.closet_id;

    const attire_id = Date.now();
    const type = req.body.type;
    const attire_name = req.body.name;
    const brand = req.body.brand;
    const color = req.body.color;
    const size = req.body.size;

    try {
      let insertAttireIntoAttireQuery = `
        INSERT INTO attire VALUES (
          '${attire_id}',
          '${type}',
          '${attire_name}',
          '${brand}',
          '${color}',
          '${size}');`;

      database.query(insertAttireIntoAttireQuery, error => {
        if (error) {
          throw error;
        }

        let insertAttireIntoClosetQuery = `
          INSERT INTO attire_contained_by_closet VALUES (
              '${attire_id}', 
              '${closet_id}');`;

        database.query(insertAttireIntoClosetQuery, error => {
          if (error) {
            throw error;
          }
        });
      });

      res.redirect('/closet');
    } catch (error) {
      let messages = { error: error };
      res.render('index', { user: req.user, messages });
    }
  }
});

module.exports = router;
