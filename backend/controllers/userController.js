// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/user");

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log(req.body)
    // validate
    if (!username || !email || !password) {
      // console.log("empty credentials")
      return res.status(400).send("empty credentials")
    }
    // check if user exists, if not create one
    const emailExists = await UserModel.findOne({ email });
    if (emailExists) {
      return res.status(400).send("Email exists. Login instead or reset your pw (TBD)")
    }
    // user doesn't exist so let's create one!
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      const result = await newUser.save();
      console.log(result)
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
      });
      
    } else {
      res.status(400).send("Something went wrong when saving the new user");
    }
  } catch (error) {
    res.status(500).send({error});
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send("empty credentials")
    }

    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      return res.status(400).send("No email found. Create an account instead!")
    }

    const isMatch = await bcrypt.compare(password, foundUser.password)
    if (foundUser && isMatch) {
      // req.session.username = username;
      console.log(req.session)
      res.status(200).send({foundUser});
    } else {
      res.status(400).send("Something went wrong finding the user");
    }
  } catch (error) {
    res.status(500).send({error});
  }
});

const getMe = asyncHandler(async (req, res) => {
  res.send(req.user);
  console.log(req.session)
  console.log(req.user)
});

const updateUser = asyncHandler(async (req, res) => {
  res.send("update me");
});

module.exports = {
  getMe,
  registerUser,
  loginUser,
  updateUser,
};


// const registerUser = asyncHandler (async (req, res) => {
//   const { username, email, password } = req.body
//   console.log(username, email, password)

//   if(!username || !email || password) {
//     res.status(400)
//     res.send("no username, email, or password")
//   }

//   // check if the email exists since that will be our unique ID
//   const emailExists = await UserModel.findOne({ email });
//   if(emailExists) {
//     console.log("email exists already");
//     res.status(400)
//     res.send("email exists already")
//   }

//   // else we hash the password, create the user
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt)

//   try {
//     const newUser = await new UserModel({
//       username,
//       email,
//       password: hashedPassword,
//     })
//     if (newUser) {
//       const result = await newUser.save()
//       res.status(201).json({
//         _id: newUser._id,
//         username: newUser.username,
//         email: newUser.email,
//         password: newUser.password,
//         // token for jwt here.
//       })
//     } else {
//       res.status(400).send("Invalid Registration")
//     }
//   } catch (error) {
//     res.status(500).send(`Something went wrong... ${error}`)
//   }
// })