var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')().listen(server);

io.on("connection", function(socket){
    
    console.log("The client has connected");
    
    socket.on("disconnect", function(){
        
        console.log("The client has disconnected");
    });
    
    socket.on("Message", function(data){
        
        console.log(data.message);
        
        io.emit("Message", data);
    });
})

server.listen(process.env.PORT, function(){
  console.log("Listening on Port" + process.env.PORT);
})