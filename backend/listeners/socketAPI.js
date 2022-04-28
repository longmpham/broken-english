//joinRoom, sendChat

// const joinRoom = (data) => {
//   const socket = this
//   console.log(socket)
//   socket.join(data);
//   console.log(`User with socket ID: ${socket.id} joined room with ID: ${data}`)

//   // todo: when user joins, grab history of room?
// }
// const sendChat = (data) => {
//   const socket = this
//   console.log(data)
//   socket.to(data.room).emit("broadcast_data", data)
// }

// const disconnectUser = (io) => {
//   console.log(data)
//   socket.to(data.room).emit("broadcast_data", data)
// }

// module.exports = { joinRoom, sendChat, disconnectUser }