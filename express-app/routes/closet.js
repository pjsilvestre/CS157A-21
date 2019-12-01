const express = require('express');
const router = express.Router();

const database = require('../config/database');

/* GET closet page */
router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    const displayChoices = ['Attire', 'Outfits'];
    const closetQuery = `
        SELECT 
          * 
        FROM closet 
          JOIN owned_by USING (closet_id) 
        WHERE username = '${req.user.username}';`;

    try {
      database.query(closetQuery, (error, closets) => {
        if (error) {
          throw error;
        } else {
          const attireQuery = `
            SELECT
              type, attire_name, brand, color, size
            FROM
              user
                JOIN
              owned_by USING (username)
                JOIN
              attire_contained_by_closet USING (closet_id)
                JOIN
              attire USING (attire_id)
            WHERE
              username = '${req.user.username}' AND closet_id = '${closets[0].closet_id}';`;

          database.query(attireQuery, (error, attire) => {
            if (error) {
              throw error;
            } else {
              res.render('closet', { displayChoices, closets, attire });
            }
          });
        }
      });
    } catch (error) {
      let messages = { error: error };
      res.render('index', { messages });
    }
  }
});

/* GET closet page, depending on a chosen closet */
router.post('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    try {
      // set the first displayChoice in displayChoices to be the chosen displayChoice
      const displayChoices = [];
      const displayChoice = req.body.displayChoice;
      if (displayChoice === 'Attire') {
        displayChoices.push('Attire');
        displayChoices.push('Outfits');
      } else {
        displayChoices.push('Outfits');
        displayChoices.push('Attire');
      }

      // set the first closet in the closet-selector to be the chosen closet
      const closets = [];
      const chosenCloset = JSON.parse(req.body.closet);
      closets.push(chosenCloset);

      const closetQuery = `
        SELECT 
          * 
        FROM closet 
          JOIN owned_by USING (closet_id) 
        WHERE username = '${req.user.username}';`;

      database.query(closetQuery, (error, allClosets) => {
        if (error) {
          throw error;
        } else {
          allClosets = JSON.parse(JSON.stringify(allClosets));

          // add all other other closets to closets
          for (const closet of allClosets) {
            if (closet.closet_id !== chosenCloset.closet_id) {
              closets.push(closet);
            }
          }

          if (displayChoice === 'Attire') {
            const attireQuery = `
              SELECT
                type, attire_name, brand, color, size
              FROM
                user
                  JOIN
                owned_by USING (username)
                  JOIN
                closet USING (closet_id)
                  JOIN
                attire_contained_by_closet USING (closet_id)
                  JOIN
                attire USING (attire_id)
              WHERE
                username = '${req.user.username}' AND location = '${chosenCloset.location}'`;

            database.query(attireQuery, (error, attire) => {
              if (error) {
                throw error;
              } else {
                attire = JSON.parse(JSON.stringify(attire));
                res.render('closet', { closets, displayChoices, attire });
              }
            });
          } else {
            const outfitQuery = `
            SELECT 
              outfit_name, type, attire_name, brand, color, size
            FROM
              user
                JOIN
              owned_by USING (username)
                JOIN
              closet USING (closet_id)
                JOIN
              outfit_contained_by_closet USING (closet_id)
                JOIN
              is_composed_of USING (outfit_name)
                JOIN
              attire_contained_by_closet USING (closet_id, attire_id)
                JOIN
              attire USING (attire_id)
            WHERE
                closet_id = '${chosenCloset.closet_id}'
            ORDER BY outfit_name;`;
            database.query(outfitQuery, (error, outfits) => {
              if (error) {
                throw error;
              } else {
                outfits = JSON.parse(JSON.stringify(outfits));
                res.render('closet', { closets, displayChoices, outfits });
              }
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
      let messages = { error: error };
      res.render('index', { messages });
    }
  }
});

module.exports = router;
