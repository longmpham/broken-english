const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const { config } = require("dotenv");
const dotenv = require("dotenv").config();
const http = require("http");
const setupSocketIOAPI = require("./listeners/socketAPI.js");

// const { Server } = require("socket.io")
// const { joinRoom, sendChat, disconnectUser } = require("./listeners/socketAPI")


const port = process.env.PORT || 9001;
connectDB();

// middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("*", cors())


// app.get('/', (req,res) => {
//   res.send('Hello World!');
// })

// routes -> translate and users
app.use("/api/translate", require("./routes/translateRoute"))
app.use("/api/users", require("./routes/userRoute"));



// app.listen(port, () => {
  //   console.log(`Server running on port ${port}`)
  // })
  
const server = http.createServer(app)

setupSocketIOAPI(server)

server.listen(port, () => {
  console.log("CHAT SERVER RUNNING")
})
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// })

// const onConnection = (socket) => {
//   socket.on("join_room", joinRoom)
//   socket.on("send_chat", sendChat)
//   socket.on("disconnect", disconnectUser)
// }

// io.on("connection", onConnection);

// io.on("connection", (socket) => {

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with socket ID: ${socket.id} joined room with ID: ${data}`)

//     // todo: when user joins, grab history of room?
    
//   })

//   socket.on("send_chat", (data) => {
//     console.log(data)
//     socket.to(data.room).emit("broadcast_data", data)
//   })

//   // listen for disconnection
//   socket.on("disconnect", () => {
//     console.log(`User disconnected from ${socket.id}`)
//   })
// })

