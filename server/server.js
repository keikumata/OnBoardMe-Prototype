var express = require('express');
var userController = require('./userController');

var bodyParser = require('body-parser');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());

app.get('/hello', userController.sendHello);

app.listen(3000);
