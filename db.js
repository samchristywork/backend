var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('var/basic.db');

db.serialize(function() {
  db.run("create table if not exists users( \
    id integer primary key, \
    username text unique, \
    hashed_password blob, \
    salt blob, \
    name text, \
    email text unique, \
    email_verified integer \
  )");

  db.run("create table if not exists foo( \
    id integer primary key, \
    name text unique \
  )");

  db.run("create table if not exists tags( \
    id integer primary key, \
    name text unique, \
    featured integer \
  )");

  db.run("create table if not exists posts( \
    id integer primary key, \
    date datetime default current_timestamp, \
    filename text unique, \
    title text, \
    featured integer \
  )");
});

module.exports = db;
