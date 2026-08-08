// This is your server code (Node.js)
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let engine = new Worker('stockfish.js');
// Serve your website files to anyone who visits
app.use(express.static(path.join(__dirname, 'public')));

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
}
);

// This is the AI robot brain
let engine = new Worker('stockfish.js');

function makeAIMove() {
    engine.postMessage('position fen ' + game.fen());
    engine.postMessage('go depth 3');
}

engine.onmessage = function (event) {
    if (event.data.startsWith('bestmove')) {
        let move = event.data.split(' ')[1];
        game.move({ from: move.substring(0, 2), to: move.substring(2, 4) });
        setTimeout(makeAIMove, 500); // wait half a second then AI moves
        board.position(game.fen());
    
    }
};
// ===== AI CODE STARTS HERE =====
let engine = new Worker('stockfish.js');

function makeAIMove() {
    engine.postMessage('position fen ' + game.fen());
    engine.postMessage('go depth 3');
}

engine.onmessage = function(event) {
    if (event.data.startsWith('bestmove')) {
        let move = event.data.split(' ')[1];
        game.move({from: move.substring(0,2), to: move.substring(2,4)});
        board.position(game.fen());
    }
}
// ===== AI CODE ENDS HERE =====