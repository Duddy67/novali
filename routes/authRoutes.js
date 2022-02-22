const express = require('express');
const authController = require('../controllers/authController');
const utils = require('../helpers/utilities');

const router = express.Router();

router.get('/', (req, res) => {
    //res.setHeader('Set-Cookie', 'newUser=true');
    //res.cookie('isEmployee', true);
    res.render('login', { 'title': 'Login', 'baseUrl': utils.getBaseUrl(req) });
});

router.post('/', authController.login);

module.exports = router;
