const express = require('express');
const morgan = require('morgan');
const ejsLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');
const blogRoutes = require('./routes/blogRoutes');
const usersRoutes = require('./routes/usersRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

//const postController = require('./controllers/blog/postController'); // test
//const userController = require('./controllers/users/userController'); //

// Express app
const app = express();

// Set the templating engine
app.use(ejsLayouts);
// Define the default layout file.
app.set('layout', './layouts/index3');
app.set('view engine', 'ejs');

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

// Serves the API with signed certificate on 3000 (SSL/HTTPS) port
const httpsServer = https.createServer({
    key: fs.readFileSync('./ssl/privkey.pem'),
    cert: fs.readFileSync('./ssl/fullchain.pem'),
}, app);

httpsServer.listen(3000, () => {
    console.log('HTTPS Server running on port 3000');
});

//app.listen(3000, () => console.log('Example app is listening on port 3000.'));
