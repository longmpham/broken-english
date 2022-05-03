const express = require("express");
const router = express.Router();
const passport = require("passport")
const { getMe, registerUser, loginUser, updateUser } = require("../controllers/userController");

// we need functions to register, login, and get login information

// GET REQUEST -> get user profile
router.get("/me", getMe);

// POST REQUEST -> register
router.post("/register", registerUser);

// GET REQUEST -> login
// router.post("/login", passport.authenticate("local", { }), loginUser);
router.post("/login", loginUser);

// PUT REQUEST -> update login
router.get("/update", updateUser);

module.exports = router;