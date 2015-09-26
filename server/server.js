process.env.PWD = process.cwd();

var express = require('express');
var userController = require('./userController');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
console.log(path.resolve(process.env.PWD + '/../client'));
app.use(express.static(path.resolve(process.env.PWD + '/../client')));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/login', userController.loginPage);
// app.post('/login', userController.login);
// app.post('/board', userController.createBoard);

app.listen(process.env.PORT);
