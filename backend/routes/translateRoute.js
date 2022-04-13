const express = require("express");
const router = express.Router();

const { translateMessage, getLanguages } = require("../controllers/translateController");

// GET REQUEST -> get languages that google can translate
router.get("/", getLanguages);

// POST REQUEST -> get translated message
router.post("/", translateMessage)

module.exports = router;