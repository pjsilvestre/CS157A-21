const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'what_do_i_wear_today'
});

const saltRounds = 10;

/* GET register page. */
router.get('/', (req, res, next) => {
    res.render('register');
});

/* POST register page. */
router.post('/', async (req, res, next) => {
    try {
        const hashed_password = await bcrypt.hash(req.body.password, saltRounds);

        connection.connect((err) => {
            if (err) {j
                console.error('Error connecting: ' + err.stack);
                return;
            }
        })

        const query = `INSERT INTO user VALUES ('${req.body.username}', '${hashed_password}');`;

        connection.query(query, (err, results) => {
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