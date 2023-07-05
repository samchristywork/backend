var express = require('express');
var db = require('../db');
var path = require('path');
var ejs = require('ejs');

var router = express.Router();

router.get('/', function(req, res, _next) {
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

router.get('/tags', function(_req, res, next) {
  db.all('select * from tags where featured = 1', function(err, rows) {
    if (err) { return next(err); }
    let response = "";
    for (let row in rows) {
      response += `
        <span class="tag" hx-get="/tag/${rows[row].id}" hx-trigger="click" hx-target=".content">
          ${rows[row].name}
        </span>
      `;
    }
    response += `
      <span class="tag" hx-get="/tag/all" hx-trigger="click" hx-target=".content">
        all
      </span>
    `;
    res.send(response);
  });
});

router.get('/tag/:id', function(req, res, next) {
  db.all('select * from tags where id = ?', [req.params.id], function(err, rows) {
    if (err) { return next(err); }
    res.send(rows);
  });
});

function generate_tag_content(row) {
  let filename = row.filename;
  let title = row.title;
  let date = row.date;
  let post_content = `
    <div class="post">
      <div class="post-title">
        <a href="/?page=posts/${filename}">
          ${title}
        </a>
      </div>
      <div class="post-date">${date}</div>
      <div class="post-content" hx-get="/post/${filename}" hx-trigger="load"></div>
    </div>
    `;

  return post_content;
}

router.get('/featured-posts', function(_req, res, next) {
  db.all('select * from posts where featured = 1', function(err, rows) {
    if (err) { return next(err); }
    let response = "";
    for (let row in rows) {
      let post_content = generate_tag_content(rows[row]);

      response += post_content;
    }
    res.send(response);
  });
});

router.use(function(err, _req, res, _next) {
  console.error(err.stack);
  res.status(500).send('Server Failure.');
});

module.exports = router;
