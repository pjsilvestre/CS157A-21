const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const database = require('../config/database');

const saltRounds = 10;

/* GET register page. */
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('register');
  }
});

/* POST register page. */
router.post('/', async (req, res) => {
  const hashed_password = await bcrypt.hashSync(req.body.password, saltRounds);

  const addUserQuery = `
    INSERT INTO user VALUES (
      '${req.body.username}', 
      '${hashed_password}');`;

  database.query(addUserQuery, error => {
    if (error) {
      let messages = { error: 'Username already taken.' };
      res.render('register', { messages });
    } else {
      res.redirect('/login');
    }
  });
});

module.exports = router;
