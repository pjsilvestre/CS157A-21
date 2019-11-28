//TODO: remove-friend.pug
const express = require("express");
const router = express.Router();

const database = require("../config/database");

/* GET remove-friend page */
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("remove-attire");
  } else {
    res.redirect("/");
  }
});

/* POST remove-friend page, redirecting to friends list*/
router.post("/", (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const username = req.user.username;
      const oldFriend = req.body.friend;

      //delete old friend from user's friends list
      let query = `DELETE FROM is_friends_with WHERE
    	  			username1 = '${username}',
    	  			username2 = '${oldFriend}';`;

      database.query(query, err => {
        if (err) throw err;
      });
    });
    } catch (err) {
      console.error(err.stack);
      res.redirect("/remove-friend");
    } finally {
      res.redirect("/friendlist");
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;