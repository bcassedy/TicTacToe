var handleUsersChange = function (users) {
  var usersUl = $('<ul id="users"></ul>');
  _.each(users, function (user) {
    var userLi = $('<li></li>');
    userLi.text(user);
    usersUl.append(userLi);
  });
  $('.waiting').html(usersUl);
}

$(document).ready(function () {
  var socket = io.connect();
  var game = new Game.Room(socket);
  chat.socket.on('usersChange', handleUsersChange);
});