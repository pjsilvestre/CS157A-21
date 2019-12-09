//TODO: remove-worn.pug
const express = require('express');
const router = express.Router();

const database = require('../config/database');

/* GET remove-worn page */
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('remove-worn');
  } else {
    res.redirect('/');
  }
});

/* POST add-friend page, redirecting to friends list*/
router.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const username = req.user.username;
      //TODO: add outfit_name field in remove-worn.pug
      const outfit_name = req.body.outfit_name;
      //TODO: add date field in remove-worn.pug
      const date = req.body.date;

      //remove worn attire from user's list
      let query = `
        DELETE FROM 
          worn_by 
        WHERE
          username = '${username}',
          outfit_name = '${outfit_name}'
          date = '${date}';`;

      database.query(query, err => {
        if (err) throw err;
      });
    } catch (err) {
      console.error(err.stack);
      res.redirect('/remove-worn');
    } finally {
      res.redirect('/worn-list');
    }
  } else {
    res.redirect('/');
  }
});

module.exports = router;
