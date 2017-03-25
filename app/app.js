var express = require('express');
var sqlite = require('sqlite3');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var db = new sqlite.Database(path.join(__dirname, '/database/database.sqlite'));

app.set('db', db);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(require(path.join(__dirname, '/api/api')));

app.get('/', function (req, res) {
  res.render('index');
});

var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log('Now running on port: ' + port);
});
