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
      return res.status(400).send("empty credentials");
    }
    // check if user exists, if not create one
    const emailExists = await UserModel.findOne({ email });
    if (emailExists) {
      return res
        .status(400)
        .send("Email exists. Login instead or reset your pw (TBD)");
    }
    // user doesn't exist so let's create one!
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    if (!newUser) {
      const result = await newUser.save();
      // console.log(result);
      return res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
      });
    }
    res.status(400).send("Something went wrong when saving the new user");
  } catch (error) {
    res.status(500).send({ error });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send("empty credentials");
    }

    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      return res.status(400).send("No email found. Create an account instead!");
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (foundUser && isMatch) {
      // req.session.username = username;
      console.log(req.session);
      res.status(200).send({ foundUser });
    } else {
      res.status(400).send("Something went wrong finding the user");
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

const getProfile = asyncHandler(async (req, res) => {
  // console.log("get profile");
  console.log(req.user);
  // res.send(req.user)
  if (!req.user || req.session.user) {
    res.status(400).send({
      success: false,
      message: "Something went terribly wrong. User did not get authenticated",
    });
  } else {
    // res.redirect('/' + req.user._id || req.session.user._id)
    // res.redirect('http://localhost:3000')

    res.status(201).send({
      success: true,
      message: "user has successfully authenticated",
      cookies: req.session,
      user: req.user,
    });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { id, firstName, lastName, weight, height, gender } = req.body;

  if (!id || !firstName || !lastName || !weight || !height || !gender) {
    return res.status(400).send({
      success: false,
      message: "The user profile's field(s) are empty",
    });
  }

  try {
    let user = await UserModel.findOne({ _id: id });
    // console.log(user);

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "The user is not found in the database",
      });
    }

    const result = await UserModel.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          // to set an object within the object, use the '.' operator
          "user.firstName": firstName,
          "user.lastName": lastName,
          "user.weight": weight,
          "user.height": height,
          "user.gender": gender,
        },
      }
    );

    if (!result) {
      return res.status(400).send({
        success: false,
        message: "Not able to save user profile's information",
      });
    }
    // console.log(result);
    user = await UserModel.findOne({ _id: id });
    // console.log(user);
    res.status(200).send({
      success: true,
      message: "user information updated",
      updatedUser: user,
    });
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = {
  getProfile,
  registerUser,
  loginUser,
  updateUser,
};
