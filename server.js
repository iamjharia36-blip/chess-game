// This is your server code (Node.js)
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve your website files to anyone who visits
app.use(express.static(path.join(__dirname,'public')));

// When a user opens your website link
io.on('connection', (socket) => {
    console.log('A player connected online! ID: ' + socket.id);

    // When Player A makes a move, send it to Player B
    socket.on('playerMove', (moveData) => {
        // Broadcast the move to all other players in the room
        socket.broadcast.emit('serverMove', moveData);
    });

    socket.on('disconnect', () => {
        console.log('A player left the game.');
    });
});

server.listen(3000, () => {
    console.log('Chess server is running live on port 3000!');
});