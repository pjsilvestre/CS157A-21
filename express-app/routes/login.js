const express = require('express');
const router = express.Router();

const passport = require('passport');

/* GET login page. */
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

/* POST login page. */
router.post(
  '/',
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
    failureFlash: true,
  })
);

module.exports = router;
