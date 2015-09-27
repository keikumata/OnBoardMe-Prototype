var place_title = document.getElementById('title');
place_title.className = "title";
place_title.innerHTML = "lol title";


var event_title = document.getElementById("event-title");
var fa_map_marker = document.createElement("i");
fa_map_marker.className = "fa fa-map-marker";
var city_name = document.createTextNode(" Camden");

var space = document.createTextNode("  ");

var fa_money = document.createElement("i");
fa_money.className = "fa fa-money";
var price = document.createTextNode(" £ 50"); 


var place_stats = document.createElement("div");

place_stats.className="place-stats";

place_stats.appendChild(fa_map_marker);
place_stats.appendChild(city_name);
place_stats.appendChild(space);
place_stats.appendChild(fa_money);
place_stats.appendChild(price);

event_title.appendChild(place_stats);


var plus_button = document.getElementById('place-plus');
plus_button.onclick = function() {
	document.getElementById('popup_wrapper').style.display = "block";
};

var cancel_button = document.getElementById('cancel-button');
cancel_button.onclick = function() {
	document.getElementById('popup_wrapper').style.display = "none";
};

var save_button = document.getElementById('save-button');
save_button.onclick = function() {
	document.getElementById('popup_wrapper').style.display = "none";
	// do more 

};