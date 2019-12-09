var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.render('index');
  } else {
    res.render('index', { user: req.user });
  }
});

/* DELETE home page (logout).*/
router.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

module.exports = router;
