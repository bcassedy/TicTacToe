var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('./node_modules/mime');
var router = require('./router');
var gameServer = require('./lib/game_room');


var server = http.createServer(function (request, response) {
  router(request, response);
}).listen(3333);

console.log('Server running');

gameServer(server);

module.exports = server;
