const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

// Signup route
router.post("/signup", authController.register);

// Login Route
router.post("/login", authController.login);

module.exports = router;
