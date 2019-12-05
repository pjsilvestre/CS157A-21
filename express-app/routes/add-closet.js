const express = require('express');
const router = express.Router();

const database = require('../config/database');

/* GET add-closet page */
router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('add-closet');
  }
});

/* POST add-closet page, redirecting to closet */
router.post('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    const username = req.user.username;
    const closet_id = Date.now();
    const location = req.body.location;

    try {
      let insertClosetIntoClosetQuery = `INSERT INTO closet VALUES ('${closet_id}', '${location}');`;

      database.query(insertClosetIntoClosetQuery, error => {
        if (error) {
          throw error;
        }

        let insertClosetIntoOwnedByQuery = `INSERT INTO owned_by VALUES ('${closet_id}', '${username}');`;
        database.query(insertClosetIntoOwnedByQuery, error => {
          if (error) {
            throw error;
          }
        });

        res.redirect('/closet');
      });
    } catch (error) {
      let messages = { error: error };
      res.render('index', { user: req.user, messages });
    }
  }
});

module.exports = router;
