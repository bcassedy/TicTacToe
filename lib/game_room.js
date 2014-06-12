var router = require('../router')
, socketIo = require('socket.io')
, _ = require('underscore')

function createChat(server) {
  var io = socketIo.listen(server)
  var guestnumber = 1;
  var nicknames = {};
  io.sockets.on('connection', function (socket) {
    guestnumber += 1;
    nicknames[socket.id] = 'Guest_' + guestnumber;
    io.sockets.emit("usersChange", _.values(nicknames));

    socket.on('join', function(other_guest) {
    });

    socket.on('disconnect', function () {
      delete nicknames[socket.id];
      socket.broadcast.emit("usersChange", _.values(nicknames));
    })
  });
}

module.exports = createChat;
