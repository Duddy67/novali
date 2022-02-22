const jwt = require('jsonwebtoken'); 
//const User = require('../models/users/user');


const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    //const authHeader = req.headers['authorization']
    //const token = authHeader && authHeader.split(' ')[1]
    //console.log(req.cookies.jwt);
    //console.log(token);

    if (token) {

        next();
    }
    else {
        res.redirect('/login');
    }
};

module.exports = {
    requireAuth
}