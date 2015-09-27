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
  img: Sequelize.STRING,
});

var Board = sequelize.define('board', {
  name: Sequelize.STRING,
});

// User.hasMany(Board,{foreignkey: 'creator'});
// Board.belongsTo(User, {foreignkey: 'creator'})

// var City = sequelize.define('city', {
//   name: Sequelize.STRING,
//   img: Sequelize.STRING,
// });

// var Attraction = sequelize.define('attraction', {
//   name: Sequelize.STRING,
//   coordinates: Sequelize.STRING,
//   location: Sequelize.STRING,
//   price: Sequelize.STRING,
//   img: Sequelize.STRING,
// });

// var AttractionOption = sequelize.define('attractionoption', {
//   attractionId: Sequelize.INTEGER,
//   boardId: Sequelize.INTEGER,
// });

// var Group = sequelize.define('group', {
//   userId: Sequelize.INTEGER,
//   boardId: Sequelize.INTEGER,
// });

// Group.findAll({
//   where: {
//     userId: 1
//   }
// }).then(function(relation) {
//   for (var i = 0; i < relation.length; i++) {
//     var bid = relation[i].boardId;
//     Board.findAll({
//       where: {
//         id: bid
//       }
//     }).then(function(board) {
//       console.log(board[0].name);
//     })

//   }
// })


// User.destroy({
//   where: {
//     id: 6
//   }
// }).then(function(user) {
//   console.log(user);
// })


// var name = 'Fall Break';
//     var invited = [1,2];
//     Board.create({name: name, userId: 2}).then(function(board) {
//       var bid = board.id;
//       console.log(bid);
//       // invited.forEach(function(friend_id) {
//       //   Group.create({
//       //     userId: friend_id,
//       //     boardId: bid
//       //   }).then(function(group) {
//       //     res.send('group created successfully');
//       //   })
//       // })
//     })
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

// var events = [
// {name: "British Museum", coordinates: "51.5195-0.1269", location: "Bloomsbury", price: "£21", img: 'http://www.qualitycrown.com/images/london-british-museum.jpg'},
// {name: "Victoria and Albert Museum", coordinates: "51.4963-0.1721", location: "Knightsbridge", price: "£75", img: 'http://www.asianimage.co.uk/resources/images/4162743/'},
// {name: "Churchill War Rooms", coordinates: "51.5021-0.1290", location: "Westminster", price: "£42", img: 'http://www.theexhibitionlist.com/wp-content/uploads/2013/03/churchill-museum-cabinet-war-room.jpeg'},
// {name: "Houses of Parliament", coordinates: "51.4992-0.1247", location: "Westminster", price: "£57", img: 'http://www.e-architect.co.uk/images/jpgs/london/houses_parliament_nw080609_2.jpg'},
// ];

// for (var i = 0; i < events.length; i++) {
//   Attraction.create({
//     name: events[i].name,
//     coordinates: events[i].coordinates,
//     location: events[i].location,
//     price: events[i].price,
//     img: events[i].img,
//     cityId: 1,
//   }).then(function(attraction) {
//     console.log(attraction);
//   })
// }

// var users = [
// {name: "Kei Yoshikoshi", img: "https://media.licdn.com/media/AAEAAQAAAAAAAAKxAAAAJGUwMTA5ZjcxLTNlNjAtNDc2NC04ODVmLTBlODNiMGI0MzcyNQ.jpg"},
// {name: "Jae Hun Ro", img: "https://scontent.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/427697_385784991433450_85817638_n.jpg?oh=63d50b811195a450d670eefb2c58b4e2&oe=569FAD31"},
// {name: "Marcos Arata", img: "https://scontent.xx.fbcdn.net/hphotos-xal1/v/t1.0-9/405140_407134742652633_1463058000_n.jpg?oh=41ff4ac7e82477271b45e8eafc2f109c&oe=56A9E699"},
// {name: "Maria Kucheryavaya", img: "https://scontent.xx.fbcdn.net/hphotos-prn2/v/t1.0-9/10653716_953956827951199_4875711962003210075_n.jpg?oh=aa6b29122db3aac1e57092e2ec991ea1&oe=569929C3"},
// {name: "Richie Dawes", img: "https://scontent.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/10563109_10152402317942968_8277816983192594913_n.jpg?oh=4f9ba729406e25027e0dbfddb2cbf63c&oe=56A4067C"},
// ];

// for (var i = 0; i < users.length; i++) {
//   User.create({
//     name: users[i].name,
//     img: users[i].img
//   });
// }

// var boards = [
// {name: "Spring Break", userId: 1},
// {name: "Graduation", userId: 1},
// {name: "American Bars", userId: 1},
// {name: "London Pubs", userId: 1},
// {name: "Birthday", userId: 1},
// ];

// for (var i = 0; i < boards.length; i++) {
//   Board.create({
//     name: boards[i].name,
//     userId: boards[i].userId
//   });
// }

// var boards = [
// {name: "Winter Break", userId: 2},
// {name: "World Cup", userId: 2},
// {name: "Backpack", userId: 2},
// {name: "Bday", userId: 2},
// ];

// for (var i = 0; i < boards.length; i++) {
//   Board.create({
//     name: boards[i].name,
//     userId: boards[i].userId
//   });
// }

// Attraction.findAll({
//   where: {
//     cityId: 1
//   }
// }).then(function(att) {
//   console.log(att);
// })


// City.findAll({}).then(function(city) {
//   console.log(city);
// })

// Board.findAll({
// }).then(function(user) {
//   for (var i =0; i < user.length; i++) {
//     console.log(user[i].dataValues.name);
//   }
// });


// User.findAll({
// }).then(function(user) {
//   for (var i =0; i < user.length; i++) {
//     console.log(user[i].img);
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


// City.findAll({
//         where: {
//           id: 1
//         }
//       }).then(function(city) {
//         console.log(city[0].name);
        
        
//       });
//       
//       

// Attraction.findAll({
//       where: {
//         id: 1
//       }
//     }).then(function(e) {
//       var obj = {};
//       obj.name = e[0].name;
//       obj.location = e[0].location;
//       obj.coordinate = e[0].coordinates;
//       obj.price = e[0].price;
//       obj.img = e[0].img;
//       console.log(obj);
//     })

// sequelize
//   .sync({ force: true })
//   .then(function(err) {
//     console.log('It worked!');
//   }, function (err) { 
//     console.log('An error occurred while creating the table:', err);
//   });
