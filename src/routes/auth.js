const express = require("express");
const router = new express.Router();

// get user model
const User = require("../models/user");

// POST    /auth/create
// Create a user
// Public
router.post("/create", async (req, res) => {
  // create new user instance from req.body
  const user = new User(req.body);
  try {
    // save the user
    await user.save();

    // generate token
    const token = await user.generateToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// POST    /auth/login
// Login a user
// Public
router.post("/login", async (req, res) => {
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
router.post("/logout", async (req, res) => {});

module.exports = router;
