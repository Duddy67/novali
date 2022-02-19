const express = require('express');
//const dashboardController = require('../controllers/dashboardController');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('login');
    res.render('login');
});


module.exports = router;
