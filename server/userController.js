
var path = require('path');
var Sequelize = require('sequelize');
process.env.DATABASE_URL = 'postgres://abtjmthjdupiri:HEFpakJRCL0Muj4gztBmEmmsqj@ec2-54-217-202-108.eu-west-1.compute.amazonaws.com:5432/dcg3pq3ehk45a5';
var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
sequelize = new Sequelize(match[5], match[1], match[2], {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     match[4],
    host:     match[3],
    logging: false,
    dialectOptions: {
        ssl: true
    }
});
sequelize
.authenticate()
.then(function(err) {
  console.log('Connection has been established successfully.');
}, function (err) { 
  console.log('Unable to connect to the database:', err);
});

var User = sequelize.define('user', {
  name: Sequelize.STRING,
  fbid: Sequelize.STRING,
});

var Board = sequelize.define('board', {
  name: Sequelize.STRING,
});

User.hasMany(Board,{foreignkey: 'creator'});
Board.belongsTo(User, {foreignkey: 'creator'})

var Country = sequelize.define('country', {
  name: Sequelize.STRING,
});

module.exports = {
	loginPage: function(req, res) {
		res.sendFile(path.resolve(__dirname + '/../client/login.html'));
	},
	login: function(req, res) {

		var name = req.body.name;
		var fbid = req.body.userid;
		User.findAll({
			where: {
				fbid: fbid,
			}
		}).then(function(user) {
			if (user.length) {
				res.cookie('user_id', user[0].dataValues.id, { maxAge: 900000, httpOnly: true });
				res.send('successfully logged in');
			} else {
				User.create({
					name: name,
					fbid: fbid,
				}).then(function(user) {
					res.cookie('user_id', user[0].dataValues.id, { maxAge: 900000, httpOnly: true });
					res.send('successfully created user')
				});
			}
		});
	},
	getBoards: function(req, res) {
		var userId = 1;
		// var userId = req.cookie['user-id'];
		Board.findAll({
			where: {
				userId: userId
			}
		}).then(function(response) {
			var obj = {boards: []};
			for (var i = 0; i < response.length; i++) {
				obj.boards.push({name: response[i].dataValues.name, bid: response[i].dataValues.id});
			}
			var str = JSON.stringify(obj);
			res.send(str);
		})
	},	
	createBoard: function(req, res) {
		var user_id = req.cookies.user_id;
		Board.create({name: "Summer break", userId: user_id}).then(function(board) {
			console.log(board);
			res.send(board);
		})
	},
	post: function(req, res) {
		console.log(req.body);
		var send = JSON.stringify(req.body);
		res.send(send);
	}
};

