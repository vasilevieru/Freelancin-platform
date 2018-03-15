var passport = require('passport');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

// Set up the express app
const app = express();
// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret:'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
var models = require('./server/models');
app.use(passport.initialize());
app.use(passport.session());
require('./server/routes/index.js')(app, passport);
require('./server/config/passport')(passport, models.app_user);


// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;