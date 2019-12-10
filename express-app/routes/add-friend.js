//TODO: friendlist.pug and add-friend.pug
const express = require('express');
const router = express.Router();

const database = require('../config/database');

/* GET add-friend page */
router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    const username = req.user.username;
    const allUsernamesQuery = `
      SELECT
        username
      FROM
        user
      WHERE
        username <> '${username}' AND
        username NOT IN (
          SELECT
            username2 as 'username'
          FROM
            is_friends_with
          WHERE
            username1 = '${username}'
          );`;

    try {
      database.query(allUsernamesQuery, (error, usernames) => {
        if (error) {
          const messages = { error: "Usernames couldn't be retrieved!" };
          res.render('index', { user: req.user, messages });
          return;
        } else if (usernames.length === 0) {
          const messages = { error: "You've already added everybody!" };
          res.render('index', { user: req.user, messages });
          return;
        } else {
          console.log({ usernames });
          res.render('add-friend', { user: req.user, usernames });
          return;
        }
      });
    } catch (error) {
      const messages = { error: error.message };
      res.render('index', { user: req.user, messages });
      return;
    }
  }
});

/* POST add-friend page, redirecting to friend-list*/
router.post('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    const username = req.user.username;
    const newFriend = req.body.friend;

    const addFriendQuery = `
      INSERT INTO is_friends_with VALUES (
        '${username}',
        '${newFriend}');`;

    try {
      database.query(addFriendQuery, error => {
        if (error) {
          let messages = { error: "Friend couldn't be added!" };
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
