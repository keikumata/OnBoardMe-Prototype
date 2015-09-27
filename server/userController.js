
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

User.hasMany(Board,{foreignkey: 'creator'});
Board.belongsTo(User, {foreignkey: 'creator'})

var City = sequelize.define('city', {
  name: Sequelize.STRING,
  img: Sequelize.STRING,
});

var Attraction = sequelize.define('attraction', {
  name: Sequelize.STRING,
  coordinates: Sequelize.STRING,
  location: Sequelize.STRING,
  price: Sequelize.STRING,
  img: Sequelize.STRING,
});

City.hasMany(Attraction, {foreignkey: 'city'});
Attraction.belongsTo(City, {foreignkey: 'city'});

var AttractionOption = sequelize.define('attractionoption', {
  attractionId: Sequelize.INTEGER,
  boardId: Sequelize.INTEGER,
});

var Group = sequelize.define('group', {
  userId: Sequelize.INTEGER,
  boardId: Sequelize.INTEGER,
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
	getFriends: function(req, res) {
		User.findAll({}).then(function(user) {
			var obj = {friends: []};
			for (var i = 0; i < user.length; i++) {
				obj.friends.push({name: user[i].name, img: user[i].img, uid: user[i].id});
			}
			var str = JSON.stringify(obj);
			res.send(str);
		})
	},
	getCities: function(req, res) {
		City.findAll({}).then(function(city) {
			var obj = {cities: []};
			for (var i = 0; i < city.length; i++) {
				obj.cities.push({name: city[i].name, cid: city[i].id, img: city[i].img});
			}
			var str = JSON.stringify(obj);
			res.send(str);
		})
	},
	getAttractions: function(req, res) {
		var cid = Number(req.query.cid);
		Attraction.findAll({
			where: {
				cityId: cid
			}
		}).then(function(att) {
			var obj = {attractions: [], city: {}};
			for (var i = 0; i < att.length; i++) {
				obj.attractions.push({name: att[i].name, img: att[i].img, price: att[i].price, location: att[i].location, aid: att[i].id});
			}
			City.findAll({
				where: {
					id: cid
				}
			}).then(function(city) {
				obj.city.name = city[0].name;
				obj.city.img = city[0].img;
				var str = JSON.stringify(obj);
				res.send(str);
			});
		})
	},
	getEventInfo: function(req, res) {
		var aid = Number(req.query.aid);
		Attraction.findAll({
			where: {
				id: aid
			}
		}).then(function(e) {
			var obj = {};
			obj.name = e[0].name;
			obj.location = e[0].location;
			obj.coordinates = e[0].coordinates;
			obj.price = e[0].price;
			obj.img = e[0].img;
			var str = JSON.stringify(obj);
			res.send(str);
		})
	},
	pinToBoard: function(req, res) {
		var aid = Number(req.query.aid);
		var bid = Number(req.query.bid);
		AttractionOption.findAll({
			where: {
				attractionId: aid,
				boardId: bid,
			}
		}).then(function(result) {
			if (result.length) {
				res.send('Already added');
			} else {
				AttractionOption.create({
					attractionId: aid,
					boardId: bid,
				}).then(function(rel) {
					res.send('Successfully added');
				});
			}
		})
		
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
			Group.findAll({
			  where: {
			    userId: userId
			  }
			}).then(function(relation) {
			  for (var i = 0; i < relation.length; i++) {
			    var bid = relation[i].boardId;
			    Board.findAll({
			      where: {
			        id: bid
			      }
			    }).then(function(board) {
			      obj.boards.push({name: board[0].name, bid: bid});
			      var str = JSON.stringify(obj);
						res.send(str);
			    })
			  }
			});
		})
	},	
	getBoardInfo: function(req, res) {
		var bid = Number(req.query.bid);
		Board.findAll({
			where: {
				id: bid
			}
		}).then(function(board) {
			var obj = {events:[], board:{}};
			obj.board.name = board[0].name;
			AttractionOption.findAll({
				where: {
					boardId: bid
				}
			}).then(function(attraction) {
				for (var i = 0; i < attraction.length; i++) {
					var aid = attraction[i].attractionId;
					Attraction.findAll({
						where: {
							id: aid
						}
					}).then(function(e) {
						for (var j = 0; j < e.length; j++) {
							obj.events.push({name: e[j].name, img: e[j].img, aid: e[j].id});
						}	
						var str = JSON.stringify(obj);
						res.send(str);
					})
				}
			})
		})
	},
	createBoard: function(req, res) {
		var name = req.body.name;
		var invited = req.body.invited;
		Board.create({name: name, userId: 2}).then(function(board) {
			var bid = board.id;
			invited.forEach(function(friend_id) {
				Group.create({
					userId: friend_id,
					boardId: bid
				}).then(function(group) {
					res.send('group created successfully');
				})
			})
		})
	},
	post: function(req, res) {
		console.log(req.body);
		var send = JSON.stringify(req.body);
		res.send(send);
	}
};

