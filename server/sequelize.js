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

// var User = sequelize.define('user', {
//   name: Sequelize.STRING,
//   fbid: Sequelize.STRING,
// });

// var Board = sequelize.define('board', {
//   name: Sequelize.STRING,
// });

// User.hasMany(Board,{foreignkey: 'creator'});
// Board.belongsTo(User, {foreignkey: 'creator'})

var City = sequelize.define('city', {
  name: Sequelize.STRING,
  img: Sequelize.STRING,
});

// var array = [
// {name: 'London', img: 'http://cdn.londonandpartners.com/assets/73295-640x360-london-skyline-ns.jpg'}, 
// {name: 'Paris', img: 'http://www.france.com/wp-content/uploads/2014/01/header.jpg'}, 
// {name: 'Berlim', img: 'http://www.magariblu.com/wp-content/uploads/2013/08/1.-Berlim.jpg'}, 
// {name: 'Venice', img: 'http://www.hurwitzjamesco.com/wp-content/uploads/2015/02/beauty_of_venice-wide.jpg'}, 
// {name: 'New York', img: 'http://7-themes.com/data_images/out/75/7028459-new-york-sunrise-wallpaper.jpg'}];

// for (var i = 0; i < array.length; i++) {
//   City.create({
//     name: array[i].name,
//     img: array[i].img,
//   }).then(function(country) {
//     console.log(country, 'country');
//   })
// }

City.findAll({}).then(function(city) {
  console.log(city);
})

// Board.findAll({
// }).then(function(user) {
//   for (var i =0; i < user.length; i++) {
//     console.log(user[i].dataValues.name);
//   }
// });
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
