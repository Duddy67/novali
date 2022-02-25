const jwt = require('jsonwebtoken'); 
//const User = require('../models/users/user');
const utils = require('../helpers/utilities');
const User = require('../models/users/user');

const config = utils.getJSON('config.json');


const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // Check if a jwt token does exist and is verified.
    if (token) {
        jwt.verify(token, config.token_secret, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                res.redirect('/login');
            }
            else {
                let user = await User.findById(decodedToken.id);
                // Inject the user data into the view.
                res.locals.currentUser = user;
                req.currentUser = user;
                next();
            }
        });
    }
    else {
        res.locals.user = null;
        res.redirect('/login');
    }
};

/*
  In case only the user has to be checked.
*/
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    // Check if a jwt token does exist and is verified.
    if (token) {
        jwt.verify(token, config.token_secret, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                // Inject the user data into the view.
                res.locals.user = user;
                next();
            }
        });
    }
    else {
        res.locals.user = null;
        next();
    }
};


module.exports = {
    requireAuth,
    checkUser
}