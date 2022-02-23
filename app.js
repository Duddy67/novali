const express = require('express');
const morgan = require('morgan');
const ejsLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const https = require('https');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const utils = require('./helpers/utilities');
const blogRoutes = require('./routes/blogRoutes');
const usersRoutes = require('./routes/usersRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const { requireAuth, checkUser } = require('./middlewares/authMiddleware');

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
app.set('view engine', 'ejs');

// Middlewares

app.use(methodOverride('_method'));
app.use(cookieParser());
// Serves static files in the "public" repository.
app.use(express.static('public'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.use('/', authRoutes);

// Make sure the user is logged in.
app.use(requireAuth);

// Add the layout engine and set the default layout file.
app.use(ejsLayouts);
app.set('layout', './layouts/index3');

app.get('/', (req, res) => {
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

// API routes
app.use('/api', apiRoutes);

/*httpsServer.listen(3000, () => {
    console.log('HTTPS Server running on port 3000');
});*/

//app.listen(3000, () => console.log('Example app is listening on port 3000.'));
