$.get("/board", function(data) {
	var jsondata = JSON.parse(data);
	var boardarray = jsondata.boards;
	var names = [];
	var ids = [];
	boardarray.forEach(function(entry) {
		names.push(entry.name);
		ids.push(entry.bid);
	});
	console.log(names, ids);
	setUpDivs(names,ids);
})

function setUpDivs(names, ids) {
	var dynamic = document.getElementById('dynamicboard');
	// var names = ["London", "Paris", "Tokyo"];
	for (var i=0; i<names.length; i++) {
		var a = document.createElement("a");
		a.href = "single-board.html?"+"bid=" + ids[i];
		var div = document.createElement("div");
		div.className="board";
		var div_title = document.createElement("div");
		div_title.className="board-title";
		div_title.innerHTML = names[i];
		div.appendChild(div_title);
		a.appendChild(div);
		dynamic.appendChild(a);
	}
}
