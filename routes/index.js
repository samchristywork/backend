var express = require('express');
var db = require('../db');
var path = require('path');
var ejs = require('ejs');

var router = express.Router();

router.get('/', function(req, res, _next) {
  console.log('user: ' + JSON.stringify(req.user));
  var data = {
    user: "Not Logged In"
  };

  if (req.user && req.user.username) {
    data.user = req.user.username;
  }

  ejs.renderFile(path.join(__dirname, '../views', 'index.html'), data, function(err, str) {
    if (err) {
      console.log(err);
    }
    res.send(str);
  });
});

router.get('/signup', function(_req, res, _next) {
  res.sendFile(path.join(__dirname, '../views', 'signup.html'));
});

router.get('/login', function(_req, res, _next) {
  res.sendFile(path.join(__dirname, '../views', 'login.html'));
});

router.get('/home', function(_req, res, _next) {
  res.sendFile(path.join(__dirname, '../views', 'home.html'));
});

router.get('/set', function(req, res, next) {
  var name = req.query.name;
  if (!name) {
    return res.send('missing name parameter');
  }

  db.run('insert into foo (name) values (?)', [name], function(err) {
    if (err) { return next(err); }
    return res.redirect('/');
  });
});

router.get('/get', function(_req, res, next) {
  db.all('select * from foo', function(err, rows) {
    if (err) { return next(err); }
    res.send(rows);
  });
});

router.use(function(err, _req, res, _next) {
  console.error(err.stack);
  res.status(500).send('Server Failure.');
});

module.exports = router;
