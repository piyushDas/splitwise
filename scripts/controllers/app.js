var states = {
  "friendList" : [],
  "selectedFriends":[],
  "expenseList":[],
  "loggedInUser":"Piyush"
}

function initSplitwise(){
  retrieveFriends();
  if(states.friendList && states.friendList.length){
    for (var i = 0; i < states.friendList.length; i++) {
      renderFriendListItem(states.friendList[i]);
    }
  } else {
    $("#friends").html("<div class = 'no-data'>No Friends added yet</div>");
  }
  updateFriendsSelection();
  retrieveExpenses();
  refreshExpenses();
}

initSplitwise();


$("#expenses").on('keyup', "#search", function(){
  if(this.value.length > 3){
    states.currentSearch = [];
    for (var i = 0; i < states.expenseList.length; i++) {
      if(states.expenseList[i].description.toLowerCase().search(this.value.toLowerCase()) > -1 || states.expenseList[i].paidBy.toLowerCase().search(this.value.toLowerCase()) > -1 || states.expenseList[i].amount.search(this.value) > -1){
        states.currentSearch.push(states.expenseList[i]);
      }
    }
    refreshExpenses(true);
  } else {
    refreshExpenses();
  }
})

$("#friend-list").on('keyup', "#friend-search", function(){
  if(this.value.length > 3){
    states.currentFriendSearch = [];
    for (var i = 0; i < states.friendList.length; i++) {
      if(states.friendList[i].name.toLowerCase().search(this.value.toLowerCase()) > -1 || states.friendList[i].email.toLowerCase().search(this.value.toLowerCase()) > -1){
        states.currentFriendSearch.push(states.friendList[i]);
      }
    }
    if(states.currentFriendSearch && states.currentFriendSearch.length){
      $("#friends").html("");
      for (var i = 0; i < states.currentFriendSearch.length; i++) {
        renderFriendListItem(states.currentFriendSearch[i]);
      }
    } else {
      $("#friends").html("<div class = 'no-data'>No Friends added yet</div>");
    }
  } else {
    if(states.friendList && states.friendList.length){
      $("#friends").html("");
      for (var i = 0; i < states.friendList.length; i++) {
        renderFriendListItem(states.friendList[i]);
      }
    } else {
      $("#friends").html("<div class = 'no-data'>No Friends added yet</div>");
    }
  }
})
