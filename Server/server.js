const express = require('express');//We will use express and http to make it easy to host our client
const app = express();//define our application
const http = require('http');//require http
const clientPath = `${__dirname}/../client`;//give the path to our client
const server = http.createServer(app);//use http to serve the app that express provides
const port = 8080;//get the server live
app.use(express.static(clientPath));//use express to host the client
const io = require('socket.io')(server);//set-up socket.io in the server
server.listen(port, () => {
    console.log("server running on " + port);
});
let activeUsers = [];
let counter = 0;//make a counter to find the amount of connected users
let user = {};
//CONNECT//
io.on('connection', function (socket) {
    socket.on('newUser', (userName) => {//receive the data of the new user.
        user[socket.id] = userName;
        activeUsers.push(user[socket.id]);               //push the new user in the array of active users.
        io.emit('active', (activeUsers));               //emit the array of objects to all clients
        counter++;                                      //add one
        //console.log(counter + ' Connected: ' + userName);
        console.log(activeUsers)

    })
//DISCONNECT//
    socket.on('disconnecting', () => {
        console.log(user[socket.id]) //disconnected user
        filter(user[socket.id]);
        io.emit ('active', activeUsers);
        counter--;                                      //remove one
        console.log(counter + ' Disconnected: ' + user[socket.id]);
    });
    function filter(user){
      let index = activeUsers.indexOf(user);
      activeUsers.splice(index, 1)
        return activeUsers;
    }

//MESSAGE TO ALL//
    socket.on('toAll', (message) => {//observer that waits until the message "toAll" gets passed to the server
        io.emit("displayMessage", (user[socket.id] + ": " + message));
        console.log(message + ": " + user[socket.id])
    });

//MESSAGE TO ME//
    socket.on('toMe', (message) => {//observer that waits until the message "toAll" gets passed to the server
        socket.emit("displayMessage", (user[socket.id] + ": " + message));
        console.log(message + ": " + user[socket.id])
    });
});
