const express = require("express");
const router = express.Router();

const { functionsForUsers } = require("../controllers/userController");

// we need functions to register, login, and get login information

// GET REQUEST -> get user profile
router.get("/me", getMe);

// POST REQUEST -> register
router.post("/", registerUser);

// GET REQUEST -> login
router.get("/login", loginUser);

// PUT REQUEST -> update login
router.get("/update", updateUser);

module.exports = router;