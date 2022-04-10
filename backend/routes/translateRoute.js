const express = require("express");
const router = express.router();

const { functionsForTranslate } = require("../controllers/translateController");

// we need functions to translate message

// router.get("/", getMessage);

// POST REQUEST -> get translated message
router.post("/translated", translateMessage)

module.exports = router;