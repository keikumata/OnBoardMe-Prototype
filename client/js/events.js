  var href = window.location.href;
  var cid = href.split("cid=")[1];
  console.log(cid);

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

  	// var city_image = document.getElementById("city-image");
  	// city_image.className="city-image";
  	// city_image.style.backgroundImage = "url('"+city.img+"')";
  	

  	var city_title_stick = document.getElementById("title-stick");
  	city_title_stick.className = "title-stick";
  	city_title_stick.innerHTML = city.name;

  	// var city_image_stick= document.getElementById("city-image-stick");
  	// city_image.className="city-image-stick";
  	// city_image.style.backgroundImage = "url('"+city.img+"')";

  	for (var i = 0 ; i<names.length;i++) {
  		var attraction = document.createElement("div");
  	attraction.className="event";

  	var event_image = document.createElement("div");
  	event_image.className="event-image";
  	event_image.style.backgroundImage = "url('"+urls[i]+"')";


  	}
  	
  }
  
// <div class="event">
// <div class="event-image" style="background-image:url('http://camaje.com/-/wp-content/uploads/2013/06/camaje-cooking-7.jpg')">
//             <div class="event-title-wrapper">
//               <div class="event-title">Recipease Jamie Oliver</div>
//               <div class="event-location"><i class="fa fa-map-marker"></i> Camden</div>
//               <div class="event-price"><i class="fa fa-money"></i> £ 50</div>
//             </div>
//             </div>
//             <div class="clear"></div>
//           </div>