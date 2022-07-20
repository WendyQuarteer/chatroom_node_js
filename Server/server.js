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

let counter = 0;//make a counter to find the amount of connected users
io.on('connection', function (socket) { ///Add 1 each time a user connects
    console.log(counter + ' someone connected');
    counter++;

    socket.on('disconnect', function () {//remove 1 each time a user connects
        counter--;
        console.log(counter + 'Got disconnect!');
    });

    socket.on('toAll', (message) =>{//observer that waits until the message "toAll" gets passed to the server
        io.emit("displayMessage", (message));
        console.log(message)
    });

    socket.on('toMe', (message) =>{//observer that waits until the message "toAll" gets passed to the server
        socket.emit("displayMessage", (message));
        console.log(message)
    });
});








