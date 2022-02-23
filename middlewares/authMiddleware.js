const jwt = require('jsonwebtoken'); 
//const User = require('../models/users/user');
const utils = require('../helpers/utilities');
const User = require('../models/users/user');

const config = utils.getJSON('config.json');


const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    //const authHeader = req.headers['authorization']
    //const token = authHeader && authHeader.split(' ')[1]
    //console.log(req.cookies.jwt);

    // Check if a jwt token does exist and is verified.
    if (token) {
        jwt.verify(token, config.token_secret, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
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
        res.redirect('/login');
    }
};

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