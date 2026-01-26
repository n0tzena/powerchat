// https://socket.io/pt-br/get-started/chat/

const http = require('http');
const express = require('express');
const { Server } = require("socket.io")

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message:' + msg);
        io.emit('chat message', msg);
    })
});

server.listen(5173, () => {
    console.log('listening on *:5173');
})