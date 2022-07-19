//We will use express and http to make it easy to host our client
const express = require('express');
const http = require('http');

//define our application
const app = express();
//give the path to our client
const clientPath = `${__dirname}/../client`;
//use express to host the client
app.use(express.static(clientPath));
//use http to serve the app that express provides
const server = http.createServer(app);
//get the server live
const port = 8080;
server.listen(port, () =>{
    console.log("server running on "+ port);
});
//set-up socket.io in the server
const io = require('socket.io')(server);

//make a counter and make it go up every time someone connects
let counter = 0;
    io.on('connection', function(socket) {
        console.log(counter+' someone connected');
        counter++;

        socket.on('close', function () {
            counter--;
        })
    });


