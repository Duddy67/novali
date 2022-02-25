const fs = require('fs');

const getBaseUrl = (req) => {
    return `${req.protocol}://${req.headers.host}`;
}

const getJSON = (fileName) => {
    let rawdata = fs.readFileSync(fileName);
    return JSON.parse(rawdata);
}

const slugify = (str) => {
    str = str.replace(/^\s+|\s+$/g, '') // Trim
    str = str.toLowerCase()
  
    // Remove accents, swap ñ for n, etc..
    var from = 'àáäâèéëêìíïîòóöôùúüûñç\'·/_,:;'
    var to = 'aaaaeeeeiiiioooouuuunc-------'

    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }
  
    str = str.replace(/[^a-z0-9 -]/g, '') // Remove invalid chars.
             .replace(/\s+/g, '-')        // Collapse whitespace and replace by an hyphen. 
             .replace(/-+/g, '-')         // Collapse dashes.
  
    return str
}

const setFieldErrors = (fields, errors) => {
    //console.log(typeof errors);
    //console.log(valid);
    fields.forEach( field => {
        for (let key in errors) {
            if (key == field.name) {
                field.error = errors[key].message;
                field.value = errors[key].value;
                //console.log(key+' '+errors[key].message);
            }
        }
    });

    return fields;
}

module.exports = {
    getBaseUrl,
    getJSON,
    slugify,
    setFieldErrors
}