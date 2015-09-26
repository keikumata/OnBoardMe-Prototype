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

User.findAll({
	where: {
		id: 3,
	}
}).then(function(user) {
	console.log(user[0].dataValues.name, 'asdlkfjas');
});

// var Friend = sequelize.define('friend', {
//   uid: Sequelize.STRING,
//   bid: Sequelize.STRING,
// });

// var Opt = sequelize.define('option', {
//   bid: Sequelize.STRING,
//   cid: Sequelize.STRING,
// });

// var Vote = sequelize.define('vote', {
//   uid: Sequelize.STRING,
//   cid: Sequelize.STRING,
//   bid: Sequelize.STRING,
// });



// sequelize
//   .sync({ force: true })
//   .then(function(err) {
//     console.log('It worked!');
//   }, function (err) { 
//     console.log('An error occurred while creating the table:', err);
//   });
