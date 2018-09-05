function updateFriendsStorage(){
  localStorage.setItem('friendList', JSON.stringify(states.friendList));
}

function retrieveFriends(){
  if(localStorage.getItem('friendList')){
    states.friendList = JSON.parse(localStorage.getItem('friendList'));
  }
}

function updateExpenseStorage(){
  localStorage.setItem('expenseList', JSON.stringify(states.expenseList));
}

function retrieveExpenses(){
  if(localStorage.getItem('expenseList')){
    states.expenseList = JSON.parse(localStorage.getItem('expenseList'));
  }
}
