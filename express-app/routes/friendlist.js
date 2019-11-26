//TODO: friendlist.pug and add-friend.pug
// Maybe consider combining these two
const express = require("express");
const router = express.Router();

const database = require("../config/database");

/* GET friends list page */
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    try {
    	//username2 = friends of username1
      const query = `
            SELECT 
                username2
            FROM
                is_friends_with
            WHERE
            username1 = '${req.user.username}';`;

      database.query(query, (err, results) => {
        if (err) throw err;
        res.render("friendlist", { user: req.user, results: results });
      });
    } catch (err) {
      console.error(err.stack);
      res.redirect("/index");
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;