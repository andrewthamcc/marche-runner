const express = require("express");
const router = new express.Router();

// get user model
const User = require("../models/user");

// get middleware auth
const auth = require("../middleware/auth");

// @GET     /users/profile
// Get user profile
// Private
router.get("/profile", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// @PATCH   /users/profile
// Edit user profile
router.patch("/profile", auth, async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error);
  }
});

// @DELETE  /users/profile
// Delete user profile
router.delete("/profile", auth, async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
