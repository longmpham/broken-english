const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const { config } = require("dotenv");
const dotenv = require("dotenv").config();
const http = require("http");
const setupSocketIOAPI = require("./listeners/socketAPI.js");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

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
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token", "Access-Control-Allow-Credentials"],
};
app.use(cors(corsOption));

// mongo cookie / session
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      // maxAge: 1000 * 60 * 60 * 24, // 1 day
      // maxAge: 1000 * 60 * 60, // 1 hour
      // maxAge: 1000 * 60 * 15, // 15 minutes
      maxAge: 1000 * 60 * 5, // 5 minutes
      // maxAge: 1000 * 60, // 1 minute
      // sameSite: "none", // uncomment if https
      // secure: true, // uncomment if https
    },
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport/passport"); // call this file to continue the passport use cases

/*********************************
 *       END OF MIDDLE WARE       *
 *********************************/

/*********************************
 *             ROUTES             *
 *********************************/
app.use("/api/translate", require("./routes/translateRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/", require("./routes/authRoute"));
app.use("/conversations", require("./routes/conversationsRoute"));

// socket IO stuff
const server = http.createServer(app);
setupSocketIOAPI(server);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`)
// })
server.listen(port, () => {
  console.log(`Chat Server running on port: ${port}`);
});
