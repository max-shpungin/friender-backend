"use strict";

const app = require("./app");
const httpServer = require("http").createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const Message = require("./models/Message")
const { PORT } = require("./config");

io.on('connection', (socket) => {
  console.log('User connected');
  // Listen for incoming messages
  socket.on('message', (message) => {
    console.log('Message:', message);
    // Broadcast the message to all connected clients

    //TODO: IIEF to send a message to the db
    // I feel dirty and this feels hacky somehow
    (async ()=>{
      await Message.createMessage(message);
    })();

    io.emit('message', message);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

httpServer.listen(3002);

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});
