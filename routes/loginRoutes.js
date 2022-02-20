const express = require('express');
//const dashboardController = require('../controllers/dashboardController');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});


module.exports = router;
