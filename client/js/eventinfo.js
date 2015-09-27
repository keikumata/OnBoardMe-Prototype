  var href = window.location.href;
  var aid = href.split("aid=")[1];

  $.get("/eventinfo?"+"aid="+aid, function(data) {
  	var jsondata = JSON.parse(data);
  	var eventobject = jsondata.events;
  	var name = eventobject.name;
  	var url = eventobject.img;
  	var loc = eventobject.location;
  	var price = eventobject.price;
  	var coordinate= eventobject.coordinates;
  	setUpDivs(name, aid, url, loc, price,coordinate);
  })




  function setUpDivs(name, aid, url, loc, price, coordinate) {
  	var place_image = document.getElementById("place-image");
  	place_image.style.backgroundImage = "url('" + url + ")'";
  	place_image.className = "place-image";

  	var place_title = document.getElementById('title');
  	place_title.className = "title";
  	place_title.innerHTML = name;


  	var event_title = document.getElementById("event-title");
  	var fa_map_marker = document.createElement("i");
  	fa_map_marker.className = "fa fa-map-marker";
  	var city_name = document.createTextNode(" " + loc);

  	var space = document.createTextNode("  ");

  	var fa_money = document.createElement("i");
  	fa_money.className = "fa fa-money";
  	var price = document.createTextNode(" " + price); 


  	var place_stats = document.createElement("div");

  	place_stats.className="place-stats";

  	place_stats.appendChild(fa_map_marker);
  	place_stats.appendChild(city_name);
  	place_stats.appendChild(space);
  	place_stats.appendChild(fa_money);
  	place_stats.appendChild(price);

  	event_title.appendChild(place_stats);

  }





