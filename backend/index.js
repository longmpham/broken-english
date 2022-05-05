const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const { config } = require("dotenv");
const dotenv = require("dotenv").config();
const http = require("http");
const setupSocketIOAPI = require("./listeners/socketAPI.js");
const session = require("express-session")
const passport = require("passport");
const MongoStore = require("connect-mongo")

let userProfile;



// const { Server } = require("socket.io")
// const { joinRoom, sendChat, disconnectUser } = require("./listeners/socketAPI")


const port = process.env.PORT || 9001;
connectDB();

/*********************************
*         MIDDLE WARE            *
*********************************/
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
// app.use(cors())
// app.use("*", cors())
// app.options("*", cors())
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))

// mongo cookie / session   
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URI,
    collectionName: "sessions",
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}))
const LocalStrategy = require("passport-local").Strategy;
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserModel = require("./models/user");
// passport
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")

/*********************************
*       END OF MIDDLE WARE       *
*********************************/


/*********************************
*             ROUTES             *
*********************************/
// routes -> translate and users
app.use("/api/translate", require("./routes/translateRoute"))
app.use("/api/users", require("./routes/userRoute"));

// socket IO stuff
const server = http.createServer(app)
setupSocketIOAPI(server)


// app.listen(port, () => {
  //   console.log(`Server running on port ${port}`)
  // })
server.listen(port, () => {
  console.log(`Chat Server running on port: ${port}`)
})