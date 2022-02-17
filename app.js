const express = require('express');
const morgan = require('morgan');
const ejsLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const https = require('https');
const fs = require('fs');
const utils = require('./helpers/utilities');
const blogRoutes = require('./routes/blogRoutes');
const usersRoutes = require('./routes/usersRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Express app
const app = express();
const config = utils.getJSON('config.json');

// Serves the API with signed certificate on 3000 (SSL/HTTPS) port
const httpsServer = https.createServer({
    key: fs.readFileSync('./ssl/privkey.pem'),
    cert: fs.readFileSync('./ssl/fullchain.pem'),
}, app);

// connect to mongodb & listen for requests
mongoose.connect(config.db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => httpsServer.listen(3000))
  .catch(err => console.log(err));

// Set the templating engine
app.use(ejsLayouts);
// Define the default layout file.
app.set('layout', './layouts/index3');
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

// Middlewares

app.use((req, res, next) => {
  //console.log('Time: ', Date.now());
  //console.log(req.get('host'));
  next();
});

// Serves static files in the "public" repository.
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    //res.send('Successful response.');
    res.redirect('dashboard');
});

app.use('/dashboard', dashboardRoutes);

// blog routes
app.get('/blog', (req, res) => {
    res.redirect('/blog/posts');
});

app.use('/blog/posts', blogRoutes);

// users routes
app.get('/users', (req, res) => {
    res.redirect('/users/users');
});

app.use('/users/users', usersRoutes);

app.use('/api', apiRoutes);

/*httpsServer.listen(3000, () => {
    console.log('HTTPS Server running on port 3000');
});*/

//app.listen(3000, () => console.log('Example app is listening on port 3000.'));
