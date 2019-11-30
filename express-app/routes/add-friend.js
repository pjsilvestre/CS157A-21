//TODO: friendlist.pug and add-friend.pug
const express = require("express");
const router = express.Router();

const database = require("../config/database");

/* GET add-friend page */
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("add-friend");
  } else {
    res.redirect("/");
  }
});

/* POST add-friend page, redirecting to friends list*/
router.post("/", (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const username = req.user.username;
      const newFriend = req.body.friend;

      //add new friend to user's friends list
      let query = `REPLACE INTO is_friends_with SET
    	  			username1 = '${username}',
    	  			username2 = '${newFriend}';`;

      database.query(query, err => {
        if (err) throw err;
      });
    });
    } catch (err) {
      console.error(err.stack);
      res.redirect("/add-friend");
    } finally {
      res.redirect("/friendlist");
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;
