const fs = require('fs');
const utils = require('../helpers/utilities');


const index = (req, res) => {
    //console.log(utils.getBaseUrl(req));
    //console.log('index post');
    res.render('dashboard', {title: 'Dashboard', req, 'baseUrl': utils.getBaseUrl(req)});
}

module.exports = {
    index
}