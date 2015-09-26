var Sequelize = require('sequelize');
var sequelize = new Sequelize('sql291441', 'sql291441', 'tM2%dY3%', {
  host: "sql2.freemysqlhosting.net",
  port: 3306
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
	login: function(req, res) {
		User.findAll({
			where: {
				name: 'Kei Yoshikoshi'
			}
		}).then(function(user) {
			res.cookie('user_id',user[0].dataValues.id, { maxAge: 900000, httpOnly: true });
			res.end();
		});
	},
	createBoard: function(req, res) {
		var user_id = req.cookies.user_id;
		Board.create({name: "Summer break", userId: user_id}).then(function(board) {
			console.log(board);
			res.send(board);
		})
	},
};

