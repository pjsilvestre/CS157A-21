const express = require("express");
const router = express.Router();

const database = require("../config/database");

/* GET add-outfit page */
router.get("/", (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect("/");
    } else {
        try {
            res.render("add-outfit");
        } catch (error) {
            res.render("add-outfit", {messages: error});
        }

    }
})

module.exports = router;