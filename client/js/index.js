var dynamic = document.getElementById('dynamic');
$.get("/city", function(data) {
	var jsondata = JSON.parse(data);
	var cityarray = jsondata.cities;
	var names = [];
	var ids = [];
	var imageurls = [];
	cityarray.forEach(function(entry) {
		names.push(entry.name);
		ids.push(entry.cid);
		imageurls.push(entry.img);
	});
	setUpDivs(names,ids,imageurls);
})


$('#search').keyup(function() {
	var $feed = $('.feed');
	var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
	reg = RegExp(val, 'i'),
	text;
	
	$feed.show().filter(function() {
		text = $(this).text().replace(/\s+/g, ' ');
		return !reg.test(text);
	}).hide();
});
// $(function(){
// 	$('#search').keyup(function() {
// 		$("#dynamic").find("." + this.id).toggle();   
// 	});
// });

function setUpDivs(names, ids, imageurls) {
	for (var i=0; i<names.length; i++) {
		var title = document.createElement("div");
		title.className = "title";
		title.innerHTML = names[i];

		var a = document.createElement("a");
		a.href = "events.html?"+"cid=" + ids[i];

		var feed_title = document.createElement("div");
		feed_title.className = "feed-title";

		var feed_image = document.createElement("div");
		feed_image.style.backgroundImage = "url("+imageurls[i]+")";
		feed_image.className = "feed-image";

		var feed = document.createElement("div");
		feed.className = "feed";

		var clear = document.createElement("div");
		clear.className = "clear";

		feed_title.appendChild(title);

		feed.appendChild(feed_image);
		feed_image.appendChild(feed_title);
		feed.appendChild(clear);
		a.appendChild(feed);
		dynamic.appendChild(a);
		dynamic.id = names[i];
	}
}