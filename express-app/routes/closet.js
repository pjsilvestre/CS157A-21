const express = require('express');
const router = express.Router();

/* GET closet page */
router.get('/', (req, res, next) => {
    res.render('closet');
})

module.exports = router;