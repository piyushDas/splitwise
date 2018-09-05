function addFriend(){
  var friend = {
    "name":$("#friend-name").val(),
    "email":$("#friend-email").val(),
    'balance':0
  }

  states.friendList.push(friend);
  $('#friends > .no-data').remove();
  renderFriendListItem(friend);
  $("#friend-name").val("");
  $("#friend-email").val("");
  updateFriendsStorage();
  updateFriendsSelection();
}

function renderFriendListItem(friend){
  var temp = '<div class="friend-item"><span class="glyphicon glyphicon-user"></span><span>'+ friend.name +'</span><span class="balance">Rs '+ (friend.balance || 0) +'</span></div>';
  $("#friends").append(temp);
}

function updateFriendsSelection(){
  $("#select-list").html("");
  for (var i = 0; i < states.friendList.length; i++) {
    var temp = '<li onclick = "selectFriend(event)">' + states.friendList[i].name +'</li>'
    $("#select-list").append(temp);
  }

  $("#paid-by").html("");
  for (var i = 0; i < states.friendList.length; i++) {
    var temp = '<option value = ' + states.friendList[i].name + '>' + states.friendList[i].name +'</option>'
    $("#paid-by").append(temp);
  }
}

function selectFriend(e){
  var currentFriend = e.currentTarget.innerText;

  if(states.selectedFriends.indexOf(currentFriend) < 0){
    states.selectedFriends.push(currentFriend);
    e.currentTarget.classList.add("selected");
  } else {
    states.selectedFriends.splice(states.selectedFriends.indexOf(currentFriend), 1);
    e.currentTarget.classList.remove("selected");
  }
  updateNotice();
}

function updateNotice(){
  if(states.selectedFriends.length){
    $('#notice').show();
    $('#notice').html("Each friend has to pay Rs " + computeAmount());
  } else {
    $('#notice').html("");
    $('#notice').hide();
  }
}
