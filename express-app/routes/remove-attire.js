const express = require('express');
const router = express.Router();

const database = require('../config/database');

/* GET remove-attire page */
router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    try {
      const username = req.user.username;

      const closetQuery = `
        SELECT DISTINCT
          closet_id, location
        FROM
          closet
            JOIN
          owned_by USING (closet_id)
            JOIN
	        attire_contained_by_closet USING (closet_id)
        WHERE username = '${username}';`;

      database.query(closetQuery, (error, closets) => {
        if (error) {
          let messages = { error: error.message };
          res.render('index', { user: req.user, messages });
          return;
        } else if (closets.length === 0) {
          let messages = { error: 'No attire to remove!' };
          res.render('index', { user: req.user, messages });
          return;
        } else {
          closets = JSON.parse(JSON.stringify(closets));

          const query = `
            SELECT 
                attire_id, attire_name, closet_id
            FROM
              user
                JOIN
              owned_by USING (username)
                JOIN
              attire_contained_by_closet USING (closet_id)
                JOIN
              attire USING (attire_id)
            WHERE
              username = '${username}';`;

          database.query(query, (error, attire) => {
            if (error) {
              let messages = { error: error.message };
              res.render('index', { user: req.user, messages });
              return;
            } else {
              attire = JSON.parse(JSON.stringify(attire));
              res.render('remove-attire', { closets, attire });
              return;
            }
          });
        }
      });
    } catch (error) {
      let messages = { error: error.message };
      res.render('index', { user: req.user, messages });
      return;
    }
  }
});

/* POST remove-attire page*/
router.post('/', (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/');
  } else {
    const attire_id = req.body.attire_id;

    const removeAttireFromAttireQuery = `
      DELETE FROM attire
      WHERE attire_id = '${attire_id}';`;

    const removeAttireFromAttireContainedByClosetQuery = `
      DELETE FROM attire_contained_by_closet
      WHERE attire_id = '${attire_id}';`;

    /*
    The schema for "is_composed_of" is (outfit_name, attire_id), where both are 
    keys. Although we want to delete all entries matching our chosen attire_id, 
    MySQL rejects this, as it wants a WHERE clause with both an outfit_name and 
    attire_id. To simplify this, we can turn off safe update mode before the 
    query, and turn it back on after the query.
    */

    const removeAttireFromIsComposedOfQuery = `
      SET SQL_SAFE_UPDATES=0;
      DELETE FROM is_composed_of
      WHERE attire_id ='${attire_id}';
      SET SQL_SAFE_UPDATES=1;`;

    const removeAttireQuery = `${removeAttireFromAttireQuery} 
    ${removeAttireFromAttireContainedByClosetQuery} 
    ${removeAttireFromIsComposedOfQuery}`;

    try {
      database.query(removeAttireQuery, error => {
        if (error) {
          let messages = { error: error };
          res.render('index', { user: req.user, messages });
          return;
        } else {
          /*
          If all of the attire associated with an outfit was removed, logically,
          the outfit ceases to exist. For an outfit, if there's no corresponding
          entry in "is_composed_of", remove the outfit from "outfit", 
          "outfit_contained_by_closet", "is_composed_of", and "worn_by"
          */
          const username = req.user.username;
          const outfitQuery = `
           SELECT 
             outfit_name
           FROM
             owned_by
               JOIN
             outfit_contained_by_closet USING (closet_id)
           WHERE
             username = '${username}';`;

          database.query(outfitQuery, (error, outfits) => {
            if (error) {
              let messages = { error: "Outfits couldn't be accessed!" };
              res.render('index', { user: req.user, messages });
              return;
            } else {
              outfits.forEach(outfit => {
                const outfit_name = outfit.outfit_name;
                const outfitInIsComposedOfQuery = `
                  SELECT DISTINCT
                    outfit_Name
                  FROM
                    is_composed_of
                  WHERE
                    outfit_name = '${outfit_name}'`;

                database.query(outfitInIsComposedOfQuery, (error, results) => {
                  if (error) {
                    let messages = {
                      error: "is_composed_of couldn't be accessed!",
                    };
                    res.render('index', { user: req.user, messages });
                    return;
                  } else {
                    if (results.length === 0) {
                      const removeOutfitFromOutfitQuery = `
                        DELETE FROM outfit 
                        WHERE 
                          outfit_name = '${outfit_name}';`;

                      const removeOutfitFromClosetQuery = `
                        DELETE FROM outfit_contained_by_closet 
                        WHERE 
                          outfit_name = '${outfit_name}';`;

                      const removeOutfitFromWornByQuery = `
                        SET SQL_SAFE_UPDATES=0;
                        DELETE FROM worn_by
                        WHERE 
                          outfit_name = '${outfit_name}';
                        SET SQL_SAFE_UPDATES=1;`;

                      const removeOutfitQuery = `${removeOutfitFromOutfitQuery} 
                        ${removeOutfitFromClosetQuery} 
                        ${removeOutfitFromWornByQuery}`;

                      database.query(removeOutfitQuery, error => {
                        if (error) {
                          let messages = {
                            error: "Outfit couldn't be deleted!",
                          };
                          res.render('index', { user: req.user, messages });
                          return;
                        }
                      });
                    }
                  }
                });
              });
            }
          });

          res.redirect('closet');
          return;
        }
      });
    } catch (error) {
      let messages = { error: error };
      res.render('index', { user: req.user, messages });
      return;
    }
  }
});

module.exports = router;
