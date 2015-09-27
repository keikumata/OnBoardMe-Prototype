var loginButton = document.getElementById('facebook-login');
loginButton.onclick = function() {
	$.post('/log').then(function(response) {
		window.location = 'boards.html';
	})
};


