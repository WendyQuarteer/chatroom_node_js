let socket = io.connect();

io.on('connection', (socket) => {
    console.log('someone connected');
});
