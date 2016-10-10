var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')().listen(server);

server.listen(process.env.PORT, function(){
  console.log("Listening on Port" + process.env.PORT);
})