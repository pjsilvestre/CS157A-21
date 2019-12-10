//TODO: remove-friend.pug
const express = require('express');
const router = express.Router();

const database = require('../config/database');

/* GET remove-friend page */
router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    const username = req.user.username;

    const friendQuery = `
      SELECT 
        username2 AS 'username'
      FROM
        is_friends_with
      WHERE
        username1 = '${username}'
      ORDER BY
        username;`;

    try {
      database.query(friendQuery, (error, friends) => {
        if (error) {
          let messages = { error: error.message };
          res.render('index', { user: req.user, messages });
          return;
        } else if (friends.length === 0) {
          let messages = { error: 'No friends to remove!' };
          res.render('index', { user: req.user, messages });
          return;
        } else {
          res.render('remove-friend', { friends });
        }
      });
    } catch (error) {
      let messages = { error: error.message };
      res.render('index', { user: req.user, messages });
      return;
    }
  }
});

/* POST remove-friend page, redirecting to friend-list*/
router.post('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    const username = req.user.username;
    const friendToRemove = req.body.username;

    const removeFriendQuery = `
      DELETE FROM is_friends_with
      WHERE
        username1 = '${username}' AND
        username2 = '${friendToRemove}';`;

    try {
      database.query(removeFriendQuery, error => {
        if (error) {
          let messages = { error: "Friend couldn't be removed!" };
          res.render('index', { user: req.user, messages });
          return;
        } else {
          res.redirect('friend-list');
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
