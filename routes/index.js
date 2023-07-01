var express = require('express');
var db = require('../db');
var path = require('path');

var router = express.Router();

router.get('/', function(_req, res, _next) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/signup', function(_req, res, _next) {
  res.sendFile(path.join(__dirname, '../public', 'signup.html'));
});

router.get('/login', function(_req, res, _next) {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

router.get('/home', function(_req, res, _next) {
  res.sendFile(path.join(__dirname, '../public', 'home.html'));
});

router.get('/set', function(req, res, next) {
  var name = req.query.name;
  if (!name) {
    return res.send('missing name parameter');
  }

  db.run('INSERT INTO foo (name) VALUES (?)', [name], function(err) {
    if (err) { return next(err); }
    return res.redirect('/');
  });
});

router.get('/get', function(_req, res, next) {
  db.all('SELECT * FROM foo', function(err, rows) {
    if (err) { return next(err); }
    res.send(rows);
  });
});

router.use(function(err, _req, res, _next) {
  console.error(err.stack);
  res.status(500).send('Server Failure.');
});

module.exports = router;
