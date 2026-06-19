// https://socket.io/pt-br/get-started/chat/

const http = require('http');
const express = require('express');
const { Server } = require("socket.io")

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const config = require("./config.json");

function emitSystemMessage(messageString)
{
    systemMessage = {
        msgUser: config.serverMessageUsername,
        msgAvatar: config.serverMessageAvatar,
        msg: messageString,
        socketId: config.serverMessageID,
        timestamp: new Date().toTimeString()
    }
    io.emit('chat message', (systemMessage))
    // messageHistory.push(systemMessage);
}

messageHistory = [];
onlineIds = [];

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {

    console.log(socket.id + " connected");
    onlineIds.push(socket.id);
    console.log(onlineIds);

    emitSystemMessage(`${socket.id} conectado.`);
    io.emit('online status', onlineIds);

    socket.on('disconnect', () => {
        console.log(socket.id + " disconnected");
        emitSystemMessage(`${socket.id} desconectado.`)

        onlineIds.splice(onlineIds.indexOf(socket.id))
        console.log(onlineIds);
    });

    if(config.chatHistory)
        io.to(socket.id).emit('message history', messageHistory);

    socket.on('chat message', (msg) => {
        console.log(`[${msg.timestamp.slice(0, 8)}] ${msg.msgUser} (${socket.id}): ${msg.msg}`);
        io.emit('chat message', msg);
        messageHistory.push(msg);
        // console.log(messageHistory);
    });

});

server.listen(5173, () => {
    console.log('listening on *:5173');
})