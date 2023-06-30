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

module.exports = router;
