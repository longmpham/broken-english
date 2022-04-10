const jwt = require("jsonwebtoken");
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