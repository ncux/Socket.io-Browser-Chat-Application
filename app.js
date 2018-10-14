const express = require('express');
const Socket = require('socket.io');
const path = require('path');

const port = process.env.PORT || 3000;

const app = express();

// static files
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

// Socket setup
const io = Socket(server);

io.on('connection', socket => {
    console.log(`Connected, socket ID: ${socket.id}`);

    // emit chat message to all clients
    socket.on('chat', data => io.sockets.emit('chat', data));

    // broadcast typing event
    socket.on('typing', data => socket.broadcast.emit('typing', data));

});
