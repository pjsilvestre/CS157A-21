const express = require ('express');
const router = express.Router();
const bcrypt = require('bcrypt');

/* GET login page. */
router.get('/', (req, res, next) => {
    res.render('login');
});

/* POST login page. */
router.post('/', async (req, res, next) => {
    res.render('login');
});

module.exports = router;