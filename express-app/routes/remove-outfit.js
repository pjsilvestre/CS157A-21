const express = require('express');
const router = express.Router();

const database = require('../config/database');

/* GET remove-outfit page */
router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('remove-outfit');
  }
});

module.exports = router;