const express = require("express");
const router = new express.Router();

// get user model
const User = require("../models/user");

// POST    /login
// Login a user
// Public
router.post("/", async (req, res) => {
  try {
    // authenticate the user from email and password sent on req.body
    const user = await User.authenticateUser(req.body.email, req.body.password);

    // generate token
    const token = await user.generateToken();

    res.send({ user, token });
  } catch (error) {
    res.status(400).json({ error: "Invalid Credentials" });
  }
});

// POST    /auth/logout
// Logout a user
// Private
// router.post("/logout", async (req, res) => {});

module.exports = router;
