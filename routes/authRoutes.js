const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => {
    //res.setHeader('Set-Cookie', 'newUser=true');
    res.cookie('isEmployee', true);
    res.render('login');
});

router.post('/', authController.login);

module.exports = router;
