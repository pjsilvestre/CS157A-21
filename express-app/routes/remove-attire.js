const express = require('express');
const router = express.Router();

const database = require('../config/database');

/* GET remove-attire page */
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

          const query = `
            SELECT 
                attire_id, attire_name, closet_id
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

          database.query(query, (error, attire) => {
            if (error) {
              throw error;
            } else {
              attire = JSON.parse(JSON.stringify(attire));
              res.render('remove-attire', { closets, attire });
              console.log({ closets, attire });
            }
          });
        }
      });
    } catch (error) {
      res.render('index', { messages: error });
    }
  }
});

/* POST remove-attire page TODO*/
router.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    const attire_id = req.body.attire_id;

    let query = `DELETE FROM attire
                 WHERE attire_id=${attireID};`;

    database.query(query, error => {
      if (error) {
        let messages = { error: error };
        res.render('remove-attire', { messages });
      } else {
        res.redirect('/closet');
      }
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
