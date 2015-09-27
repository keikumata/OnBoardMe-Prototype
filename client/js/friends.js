 $.get("/friend", function(data) {
  var jsondata = JSON.parse(data);
  var friendarray = jsondata.friends;
  var names = [];
  var uids = [];
  var urls = [];
  friendarray.forEach(function(entry) {
    names.push(entry.name);
    uids.push(entry.uid);
    urls.push(entry.img);
  });
  console.log(data);
  setUpDivs(names,uids,urls);
})

var friends_array = [];

 function setUpDivs(names,uids,urls) {
  var dynamic = document.getElementById("dynamic");
  dynamic.className="friends-list";
  for (var i=0; i<names.length;i++) {
    var friend = document.createElement("div");
    friend.className="friend";

    var profpic= document.createElement("img");
    profpic.src = urls[i];
    profpic.className = "friend-photo-img";

    var friend_photo = document.createElement("div");
    friend_photo.className = "friend-photo";

    var friend_name = document.createElement("div");
    friend_name.className="friend-name";

    var name = document.createTextNode(names[i]);

    var friend_add = document.createElement("div");
    friend_add.className="friend-add";

    var friend_form = document.createElement("form");
    // friend_form.action= "#";

    var p = document.createElement("p");

    var input = document.createElement("input");
    input.type="checkbox";
    input.id = ""+i;

    var label = document.createElement("label");
    label.htmlFor = ""+i;

    var clear = document.createElement("div");
    clear.className="clear";

    friend_photo.appendChild(profpic);
    friend.appendChild(friend_photo);

    friend_name.appendChild(name);
    friend.appendChild(friend_name);

    p.appendChild(input);
    p.appendChild(label);
    friend_form.appendChild(p);
    friend_add.appendChild(friend_form);
    friend.appendChild(friend_add);

    friend.appendChild(clear);
    dynamic.appendChild(friend);

    friends_array.push(uids[i]);
  }
}

var boardinput = document.getElementById('search');
var invitebutton = document.getElementById('invite-button');
invitebutton.onclick = function() {
  var name = document.getElementById('search').value;
  var obj = {invited: [], name: name};
  friends_array.forEach(function(el, i) {
    var input = document.getElementById(''+i);
    if (input.checked) {
      obj.invited.push(el);
    }
  });
  if (obj.invited.length && obj.name){
    $.post('/create', obj).then(function(res) {
      // window.location = 'boards.html';
      console.log(res);
    })
  } else {
    console.log('please select at least one friend or input a name');
  }
};


// <div class="friend">

// <div class="friend-photo">
// <img class="friend-photo-img" src="http://www.fox.com/sites/default/files/Avatar-NewGirl_1.jpg">
// </div>

// <div class="friend-name">
// kate p.
// </div>

// <div class="friend-add">
// <form action="#">
// <p>
// <input type="checkbox" id="test1" />
// <label for="test1"></label>
// </p>
// </form>
// </div>

// <div class="clear"></div>
// </div> 






