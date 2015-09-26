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

User.findAll({
}).then(function(user) {
	console.log(user, 'asdlkfjas');
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
