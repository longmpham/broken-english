const { Server } = require("socket.io");

const setupSocketIOAPI = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(
        `User with socket ID: ${socket.id} joined room with ID: ${data}`
      );

      // todo: when user joins, grab history of room?
    });

    socket.on("send_chat", (data) => {
      console.log(data);
      socket.to(data.room).emit("broadcast_data", data);
    });

    // listen for disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected from ${socket.id}`);
    });
  });
};


module.exports = setupSocketIOAPI