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

app.use("/api/translate", require("./routes/translateRoute"))
app.use("/api/users", require("./routes/userRoute"));

// app.post('/', async (req, res) => {
//   console.log(req.body)
//   const q = req.body.q;
//   // console.log(`q is: ${q}`);
//   // const options = { 
//   //   method: 'POST',
//   //   url: 'https://translation.googleapis.com/language/translate/v2',
//   //   form: { 
//   //     key: process.env.TRANSLATE,
//   //     q: q,
//   //     target: 'en' 
//   //   } 
//   // };
//   // res.json({test: "test"});
//   res.json("thisisatest");
//   // request(options, (error, response, body) => {
//   //   if (error) throw new Error(error);
//   //   console.log(body);
//   //   // res.send(body);
//   // });
// })

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})