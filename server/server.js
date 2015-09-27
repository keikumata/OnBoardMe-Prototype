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


app.use(express.static(path.resolve(__dirname + '/../client')));
app.use(bodyParser());
app.use(cookieParser());

app.get('/login', userController.loginPage);
app.post('/login', userController.login);

app.get('/city', userController.getCities);

app.get('/board', userController.getBoards);
app.get('/boardinfo', userController.getBoardInfo);

app.listen(process.env.PORT || 8000);
