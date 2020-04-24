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

    res.send({ id: user._id, token });
  } catch (error) {
    res.status(401).send(error);
  }
});

module.exports = router;
