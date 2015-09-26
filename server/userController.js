module.exports = {
	test: function(req, res) {
		var message = JSON.stringify({hi: 'hello'});
		res.send(message);
	},
	sendHello: function(req, res) {
		res.send('whaddup');
	},
};