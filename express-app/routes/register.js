const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const database = require('../config/database');

const saltRounds = 10;

/* GET register page. */
router.get('/', (req, res, next) => {
    res.render('register');
});

/* POST register page. */
router.post('/', async (req, res, next) => {
    try {
        const hashed_password = await bcrypt.hash(req.body.password, saltRounds);

        let user_id = Date.now();

        const query = `INSERT INTO user VALUES ('${user_id}', '${req.body.username}', '${hashed_password}');`;

        database.query(query, (err, results) => {
            if (err) throw err;
        })
    }
    catch (err) {
        console.error(err.stack);
        res.redirect('/register');
    }
    finally {
        res.redirect('/login');
    }

});

module.exports = router;