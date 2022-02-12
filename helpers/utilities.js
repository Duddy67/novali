const fs = require('fs');

const getBaseUrl = (req) => {
    return `${req.protocol}://${req.headers.host}`;
}

const getJSON = (fileName) => {
    let rawdata = fs.readFileSync(fileName);
    return JSON.parse(rawdata);
}

module.exports = {
    getBaseUrl,
    getJSON
}