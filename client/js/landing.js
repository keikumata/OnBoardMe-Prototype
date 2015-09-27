var id = document.cookie.split('user_id=');
if (id[1]) {
	window.location = 'boards.html';
} else {
	var loginButton = document.getElementById('facebook-login');
	loginButton.onclick = function() {
		$.post('/log').then(function(response) {
			window.location = 'boards.html';
		})
	};
}


