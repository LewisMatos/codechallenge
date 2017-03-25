var express = require('express');
var router = express.Router();

router.get('/api/people', function (req, res) {
  var db = req.app.get('db');
  db.all('SELECT * from people', function (err, rows) {
    if (err) {
      res.status(500);
      return;
    }
    res.status(200);
    res.json(rows);
  });
});

router.post('/api/people', function (req, res) {
  var person = req.body;
  var db = req.app.get('db');
  db.run('INSERT INTO people (name,favoriteCity) VALUES(?,?)', [person.name, person.favoriteCity], function (err) {
    if (err) {
      res.status(500);
      return;
    }
    res.status(200);
    person.id = this.lastID;
    res.json(person);
  });
});

router.get('/api/people/:id', function (req, res) {
  var person = req.params;
  var db = req.app.get('db');
  db.all('SELECT * from people where id=?', person.id, function (err, row) {
    if (err) {
      res.status(500);
      return;
    }
    res.json(row);
    res.status(200);
  });
});

router.put('/api/people/:id', function (req, res) {
  var person = req.body;
  var db = req.app.get('db');
  person.id = req.params.id;
  db.run('UPDATE people SET name=?, favoriteCity=? where id=?', [person.name, person.favoriteCity, person.id], function (err) {
    if (err) {
      res.status(500);
      return;
    }
    res.json(person);
    res.status(200);
  });
});

router.delete('/api/people/:id', function (req, res) {
  var person = req.params;
  var db = req.app.get('db');
  db.run('DELETE FROM people where id=?', person.id, function (err) {
    if (err) {
      res.status(500);
      return;
    }
    res.status(200);
  });
});

module.exports = router;
