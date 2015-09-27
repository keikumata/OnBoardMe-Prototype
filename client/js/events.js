  var href = window.location.href;
  var cid = href.split("cid=")[1];

  $.get("/attraction?"+"cid="+cid, function(data) {
  	var jsondata = JSON.parse(data);
  	var attractionarray = jsondata.attractions;
  	var city = jsondata.city;
  	var names = [];
  	var aids = [];
  	var urls = [];
  	var loc = [];
  	var price = [];
  	attractionarray.forEach(function(entry) {
  		names.push(entry.name);
  		aids.push(entry.aid);
  		urls.push(entry.img);
  		loc.push(entry.location);
  		price.push(entry.price);
  	});
  	setUpDivs(names,aids,urls, loc, price,city);
  })


  function setUpDivs(names,aids,urls,loc,price,city) {
  	var city_title = document.getElementById("title");
  	city_title.className = "title";
  	city_title.innerHTML = city.name;

  	var city_image = document.getElementById("city-image");
  	city_image.className="city-image";
  	city_image.style.backgroundImage = "url('"+city.img+"')";
  	

  	var city_title_stick = document.getElementById("title-stick");
  	city_title_stick.className = "title-stick";
  	city_title_stick.innerHTML = city.name;

  	var city_image_stick= document.getElementById("city-image-stick");
  	city_image_stick.className="city-image-stick";
  	city_image_stick.style.backgroundImage = "url('"+city.img+"')";

  	var dynamic_event = document.getElementById("dynamic-event");

  	for (var i = 0 ; i<names.length;i++) {
  		var a = document.createElement("a");
  		a.href = "eventinfo.html?"+"aid=" + aids[i];

  		var attraction = document.createElement("div");
  		attraction.className="event";

  		var event_image = document.createElement("div");
  		event_image.className="event-image";
  		event_image.style.backgroundImage = "url('"+urls[i]+"')";

  		var event_title_wrapper = document.createElement("div");
  		event_title_wrapper.className="event-title-wrapper";

  		var event_title = document.createElement("div");
  		event_title.className="event-title";
  		event_title.innerHTML = names[i];

  		var event_location = document.createElement("div");
  		event_location.className="event-location";

  		var map_icon = document.createElement("i");
  		map_icon.className="fa fap-map-marker";

  		event_location.appendChild(map_icon);
  		var event_location_name = document.createTextNode(" " + loc[i]);
  		event_location.appendChild(event_location_name);

  		var event_price = document.createElement("div");
  		event_price.className="event-price";

  		var money_icon = document.createElement("i");
  		money_icon.className = "fa fa-money";

  		event_price.appendChild(money_icon);
  		var event_price_value = document.createTextNode(" " + price[i]);
  		event_price.appendChild(event_price_value);

  		var clear = document.createElement("div");
  		clear.className = "clear";

  		event_title_wrapper.appendChild(event_title);
  		event_title_wrapper.appendChild(event_location);
  		event_title_wrapper.appendChild(event_price);

  		event_image.appendChild(event_title_wrapper);
  		event_image.appendChild(clear);
  		attraction.appendChild(event_image);
  		a.appendChild(attraction);
  		dynamic_event.appendChild(a);
  	}
  	var dropdown = document.getElementById("events-filter-drop-down");
  	var filter = document.getElementById("events-filter");
  	filter.setAttribute('contentdown', 'false');
  	filter.onclick = function() {
  		if (filter.getAttribute('contentdown')=='false') {
  			$('#events-filter-drop-down').stop().slideDown(500);
  			filter.setAttribute('contentdown','true');
  		} else {
  			$('#events-filter-drop-down').stop().slideUp(500);
  			filter.setAttribute('contentdown','false');
  		}
  	};

  }
