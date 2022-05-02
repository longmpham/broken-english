// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/user");



const registerUser = asyncHandler (async (req, res) => {
  const { username, email, password } = req.body
  console.log(username, email, password)

  if(!username || !email || password) {
    res.status(400)
    res.send("no username, email, or password")
  }

  // check if the email exists since that will be our unique ID
  const emailExists = await UserModel.findOne({ email });
  if(emailExists) {
    console.log("email exists already");
    res.status(400)
    res.send("email exists already")
  }

  // else we hash the password, create the user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt)

  try {
    const newUser = await new UserModel({
      username,
      email,
      password: hashedPassword,
    })
    if (newUser) {
      const result = await newUser.save()
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        // token for jwt here.
      })
    } else {
      res.status(400).send("Invalid Registration")
    }
  } catch (error) {
    res.status(500).send(`Something went wrong... ${error}`)
  }
})

const loginUser = asyncHandler (async (req, res) => {
  
})

const getMe = asyncHandler (async (req, res) => {
  
})

const updateUser = asyncHandler (async (req, res) => {
  
})

module.exports = {
  getMe, 
  registerUser, 
  loginUser, 
  updateUser
}