function computeAmount(){
  var expenseTotal = $("#amount").val();
  var expensePerHead = Math.round(parseInt(expenseTotal) / states.selectedFriends.length);
  if(isNaN(expensePerHead)){
    expensePerHead = 0;
  }
  return expensePerHead;
}

function updateDashboard(e){
  if(validateExpenseModal()){
    if(e.currentTarget.innerText === "Edit"){
      states.expenseList[states.currentIndex] = {
          'amount' : $("#amount").val(),
          'description':$("#description").val(),
          'members':JSON.parse(JSON.stringify(states.selectedFriends)),
          'expensePerHead': computeAmount(),
          'paidBy': $("#paid-by option:selected" ).text()
      }
      var expensePerHead = Math.round( parseInt(states.currentAmount)/ states.currentMembers.length);
      revertBalance(states.currentIndex, expensePerHead, states.currentMembers);
    } else {
      states.expenseList.push({
        'amount' : $("#amount").val(),
        'description':$("#description").val(),
        'members':JSON.parse(JSON.stringify(states.selectedFriends)),
        'expensePerHead': computeAmount(),
        'paidBy': $("#paid-by option:selected" ).text()
      })
    }
    calculateBalance();
    updateExpenseStorage();
    refreshExpenses();
    states.selectedFriends.length = 0;
    resetModal();
  }
}

function resetModal(){
  $(".selected").removeClass("selected");
  $("#amount").val("");
  $("#description").val("");
  $("#paid-by").val("");
  $("#notice").hide();
}

function validateExpenseModal(){
  if(!$("#amount").val()){
    $(".error").html("Please add the total amount");
    return false;
  }

  if(!$("#description").val()){
    $(".error").html("Please provide a suitable description");
      return false;
  }


  if(!states.selectedFriends.length){
    $(".error").html("Please select the friends you want the bill to be split in");
      return false;
  }

  return true;
}


function refreshExpenses(searchEnabled){
  var list;
  if(searchEnabled){
    list = states.currentSearch;
  } else {
    list = states.expenseList;
  }

  if(list.length){
    $('#expenses-container > .no-data').remove();
    $('#expenses-container').html("");
    for (var i = 0; i < list.length; i++) {
      var members = list[i].members.join(", ");
      var temp = '<div class="col-md-12 col-sm-12 expense-item" id = "expense_'+i+'"><div class=""><span>' + list[i].description + ' paid by '+ list[i].paidBy +'</span><span>  - Rs ' +list[i].amount + '</span></div><div class = "members">' + members + '<span class = "inline-action" onclick = deleteExpense(event);>&times</span><span class = "inline-action" onclick = editExpense(event);>Edit</span></div></div>';
      $('#expenses-container').append(temp);
    }
  } else {
    $('#expenses-container').html("<div class = 'no-data'>No expenses added</div>");
  }

}

function editExpense(e){
  $("#expense-modal").modal('show');
  states.currentIndex = e.currentTarget.parentElement.parentElement.id.split("_")[1];
  states.currentAmount = states.expenseList[states.currentIndex].amount;
  states.currentMembers = states.expenseList[states.currentIndex].members;
  $("#amount").val(states.expenseList[states.currentIndex].amount);
  $("#description").val(states.expenseList[states.currentIndex].description);
  $("#paid-by").val(states.expenseList[states.currentIndex].paidBy);

  $("#expense-button").text("Edit");
}

function deleteExpense(e){
  var index = e.currentTarget.parentElement.parentElement.id.split("_")[1];
  var expensePerHead = Math.round(parseInt(states.expenseList[index].amount) / states.expenseList[index].members.length)
  revertBalance(index, expensePerHead, states.expenseList[index].members);

  states.expenseList.splice(index, 1);
  updateExpenseStorage();
  refreshExpenses();
  updateFriendsStorage();
}

function revertBalance(index, expensePerHead, members){
  for (var i = 0; i < states.friendList.length; i++) {
    if(members.indexOf(states.friendList[i].name) > -1){
      states.friendList[i].balance = parseInt(states.friendList[i].balance) - expensePerHead;
    }
  }
  if(states.friendList && states.friendList.length){
    $("#friends").html("");
    for (var i = 0; i < states.friendList.length; i++) {
      renderFriendListItem(states.friendList[i]);
    }
  }
}

function calculateBalance(){
  var expensePerHead = computeAmount();
  for (var i = 0; i < states.friendList.length; i++) {
    if(states.selectedFriends.indexOf(states.friendList[i].name) > -1){
      states.friendList[i].balance = parseInt(states.friendList[i].balance) + expensePerHead;
    }
  }
  if(states.friendList && states.friendList.length){
    $("#friends").html("");
    for (var i = 0; i < states.friendList.length; i++) {
      renderFriendListItem(states.friendList[i]);
    }
  }
  updateFriendsStorage();
}
