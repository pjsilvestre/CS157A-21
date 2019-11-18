const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const database = require('../scripts/database');

const saltRounds = 10;

/* GET register page. */
router.get('/', (req, res, next) => {
    res.render('register');
});

/* POST register page. */
router.post('/', async (req, res, next) => {
    try {
        const hashed_password = await bcrypt.hash(req.body.password, saltRounds);

        database.connect((err) => {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            }
        })

        const query = `INSERT INTO user VALUES ('${req.body.username}', '${hashed_password}');`;

        database.query(query, (err, results) => {
            if (err) throw err;
        })
    }
    catch {
        res.redirect('/register');
    }
    finally {
        //connection.close();
        res.redirect('/login');
    }


});

module.exports = router;