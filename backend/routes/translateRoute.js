const express = require("express");
const router = express.Router();

const { translateMessage } = require("../controllers/translateController");

// we need functions to translate message

// router.get("/", getMessage);

// POST REQUEST -> get translated message
router.post("/", translateMessage)

module.exports = router;