const express = require('express');
const router = express.Router();

const database = require('../config/database');

/* GET edit-attire page. */
router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    const query = `
    SELECT 
        attire_id, type, attire_name, brand, color, size
    FROM
        user
            JOIN
        owned_by USING (username)
        JOIN
      attire_contained_by_closet USING (closet_id)
        JOIN
      attire USING (attire_id)
    WHERE
    username = '${req.user.username}';`;

    try {
      database.query(query, (error, results) => {
        if (error) {
          let messages = { error: error.message };
          res.render('index', { user: req.user, messages });
        } else if (results.length === 0) {
          let messages = { error: 'No attire to edit!' };
          res.render('index', { user: req.user, messages });
        } else {
          res.render('edit-attire', { results: results });
        }
      });
    } catch (error) {
      let messages = { error: error };
      res.render('index', { user: req.user, messages });
    }
  }
});

/* POST edit-attire page. */
router.post('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    const attireID = req.body.attireID;
    const newType = req.body.newType;
    const newAttireName = req.body.newAttireName;
    const newBrand = req.body.newBrand;
    const newColor = req.body.newColor;
    const newSize = req.body.newSize;

    let query = `UPDATE attire SET 
                  type='${newType}', 
                  attire_name='${newAttireName}', 
                  brand='${newBrand}', 
                  color='${newColor}', 
                  size='${newSize}'
                WHERE attire_id=${attireID};`;

    try {
      database.query(query, error => {
        if (error) {
          let messages = { error: error };
          res.render('index', { user: req.user, messages });
        } else {
          res.redirect('/closet');
        }
      });
    } catch (error) {
      let messages = { error: error };
      res.render('index', { user: req.user, messages });
    }
  }
});

module.exports = router;
