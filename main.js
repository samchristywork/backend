require('dotenv').config();

var express = require('express');
var morgan = require('morgan');
var passport = require('passport');
var path = require('path');
var session = require('express-session');

var connect = require('connect-sqlite3')(session);

// Middleware
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new connect({ db: 'sessions.db', dir: './var/' })
}));
app.use(passport.authenticate('session'));

// Routes
app.use('/', require('./routes/index'));

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}.`));
