const bcrypt = require('bcrypt');
const database = require('../config/database');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const saltRounds = 10;


function initialize(passport, user) {
    const authenticateUser = async (username, password, done) => {
        try {
            const usernameQuery = `SELECT * FROM user WHERE username='${username}';`;

            database.query(usernameQuery, (err, results) => {
                if (results.length == 0) {
                    return done(null, false, { message: 'User not found' });
                }
                else {
                    const hashed_password = results[0].hashed_password;
                    if (bcrypt.compareSync(password, hashed_password)) {
                        //user found
                        return done(null, user = { username: username, id: results[0].id });
                    }
                    else {
                        return done(null, false, { message: 'Incorrect password' });
                    }
                }
            })
        }

        catch (err) {
            console.error(err.stack);
        }
    }

    passport.use(new LocalStrategy({}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
}

module.exports = initialize;