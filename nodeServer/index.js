// Node server which will handle Socket.io connections
const io = require("socket.io")(8002); // http instance this server will listen to incoming events
const users = {};

// io.on is a socket.io instance
// when ever there is a new connection
io.on("connection", (socket) => {
  // socket.on --> what should happen to a particular connection
  socket.on("new-user-joined", (name) => {
    console.log("hi ", name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name); // this will notify everyone that a new user joined except the one who joined
  });

  // when a user sends a message
  socket.on("send", (message) => {
    socket.broadcast.emit("recieve", {
      message: message,
      name: users[socket.id],
    });
  });

  // when a user leave the chat
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});
