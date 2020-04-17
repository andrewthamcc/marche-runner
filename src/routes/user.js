const express = require("express");
const router = new express.Router();

// get user model
const User = require("../models/user");

// get middleware auth
const auth = require("../middleware/auth");

// @GET     /profile
// Get user profile
// Private
router.get("/", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// @PATCH   /profile
// Edit user profile
router.patch("/", auth, async (req, res) => {
  const user = req.user;

  // allowed updates
  const allowedUpdates = ["firstName", "lastName", "email", "password"];
  const updates = Object.keys(req.body);

  const validUpdates = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!validUpdates) {
    return res.status(400).send({ error: "Invalid update request." });
  }

  try {
    // loop through updates and update entries on user instance
    updates.forEach((update) => (user[update] = req.body[update]));

    // save user
    await user.save();

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// @DELETE  /profile
// Delete user profile
router.delete("/", auth, async (req, res) => {
  const user = req.user._id;

  try {
    await user.remove();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
