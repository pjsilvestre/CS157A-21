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

          res.render('remove-outfit', { closets });
        }
      });
    } catch (error) {
      res.render('remove-outfit', { messages: error });
    }
  }
});

module.exports = router;
