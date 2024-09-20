const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

// Initialize the app and create a server
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log('New user connected');

    // Send a welcome message to the newly connected user
    socket.emit('message', 'Welcome to the chat!');

    // Broadcast when a user connects (to all clients except the one connecting)
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Listen for chat message from the client
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);  // Send the message to everyone
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
