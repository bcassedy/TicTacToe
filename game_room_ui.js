var handleUsersChange = function (users) {
  var usersDiv = $('<div id="users"></div>');
  _.each(users, function (user) {
    var userDiv = $('<div class="user"></div>');
    userDiv.text(user);
    usersDiv.append(userDiv);
  });
  $('.waiting').html(usersDiv);
}

$(document).ready(function () {
  var socket = io.connect();
  var lobby = new TTTGame.Lobby(socket);
  lobby.socket.on('usersChange', handleUsersChange);
});