var href = window.location.href;
var bid = href.split("bid=")[1];
$.get("/boardinfo?"+"bid="+bid, function(data) {
	var jsondata = JSON.parse(data);
	var attractionarray = jsondata.events;
	var boardname = jsondata.board.name;
	var names = [];
	var aids = [];
	var imageurls = [];
	attractionarray.forEach(function(entry){
		names.push(entry.name);
		aids.push(entry.aid);
		imageurls.push(entry.img);
	});
	setUpDivs(names,aids,imageurls,boardname);
});

function setUpDivs(names,aids,imageurls,boardname) {
	var single_board_wrapper_title = document.getElementById("single-board-wrapper-title");
	single_board_wrapper_title.innerHTML = boardname; // temp
	single_board_wrapper_title.className="single-board-wrapper-title";

	var dynamic = document.getElementById("dynamic");
	for (var i=0;i<names.length;i++) {
		var single_board_details_text = document.createElement("div");
		single_board_details_text.className="single-board-details-text";
		single_board_details_text.innerHTML = names[i];

		var single_board_voting = document.createElement("div");
		single_board_voting.className = "vote-menu-wrapper";

		var menu = document.createElement("div");
		menu.className = 'vote-board-menu';
		menu.id = ''+aids[i]+'-'+bid;
		menu.innerHTML = 'Vote';

		single_board_voting.appendChild(menu);

		var single_board_details = document.createElement("div");
		single_board_details.className = "single-board-details";

		var clear = document.createElement("div");
		clear.className="clear";

		var single_board_image = document.createElement("div");
		single_board_image.style.backgroundImage = "url('"+imageurls[i]+"')";
		single_board_image.className = "single-board-image";
		single_board_image.id = ''+aids[i];

		var single_board = document.createElement("div");
		single_board.className = "single-board";
		

		single_board_details.appendChild(single_board_details_text);
		single_board.appendChild(single_board_image);
		single_board.appendChild(single_board_details);
		single_board.appendChild(single_board_voting);
		single_board.appendChild(clear);

		single_board_image.onclick = function() {
			var aid = this.id;
			window.location = 'eventinfo.html?aid=' + aid;
		};

		menu.onclick = function() {
			var split = this.id.split('-');
			var aid = split[0];
			var bid = split[1];
			var body = {aid: aid, bid: bid};
			$.post('/vote', body).then(function(response) {
				// change color to green
				console.log(response);
			});
		};

		dynamic.appendChild(single_board);
	}
}
