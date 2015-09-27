
var single_board_wrapper_title = document.getElementById("single-board-title");
single_board_wrapper_title.innerHTML = "some title"; // temp
single_board_wrapper_title.className="single-board-wrapper-title";

var dynamic = document.getElementById("dynamic");
var locations = ["London", "Paris"];
for (var i=0;i<locations.length;i++) {
	var single_board_details_text = document.createElement("div");
	single_board_details_text.className="single-board-details-text";
	single_board_details_text.innerHTML = locations[i];

	var single_board_details = document.createElement("div");
	single_board_details.className = "single-board-details";

	var clear = document.createElement("div");
	clear.className="clear";

	var single_board_image = document.createElement("div");
	single_board_image.style.backgroundImage = "url('http://cdn.londonandpartners.com/assets/73295-640x360-london-skyline-ns.jpg')";
	single_board_image.className = "single-board-image";

	var single_board = document.createElement("div");
	single_board.className = "single-board";

	single_board_details.appendChild(single_board_details_text);
	single_board.appendChild(single_board_image);
	single_board.appendChild(single_board_details);
	single_board.appendChild(clear);
	dynamic.appendChild(single_board);
}
