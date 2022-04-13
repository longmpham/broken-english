const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const { config } = require("dotenv");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 9001;
connectDB();

// middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("*", cors())


app.get('/', (req,res) => {
  res.send('Hello World!');
})

// routes -> translate and users
app.use("/api/translate", require("./routes/translateRoute"))
app.use("/api/users", require("./routes/userRoute"));


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})