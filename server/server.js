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

<<<<<<< HEAD
app.use(express.static(path.resolve(__dirname + '/../client')));
app.use(bodyParser());
=======
app.use(express.static(path.resolve(__dirname + '/../client/')));
app.use(bodyParser.json());
>>>>>>> 434888b8f2af8c560bca0ea85d8dafb412eed7b1
app.use(cookieParser());

app.get('/login', userController.loginPage);
app.post('/login', userController.login);
// app.post('/board', userController.createBoard);

app.listen(process.env.PORT || 8000);
