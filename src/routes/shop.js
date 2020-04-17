const express = require("express");
const router = new express.Router();

// get auth middleware
const auth = require("../middleware/auth");

// get item model
const Item = require("../models/item");

// ALL ROUTES ARE PRIVATE

// @POST    /shop
// create an item
router.post("/", auth, async (req, res) => {
  const user = req.user._id;

  const item = new Item({ ...req.body, user });

  try {
    await item.save();

    res.status(201).send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

// @GET     /shop
// get all items
router.get("/", auth, async (req, res) => {
  const user = req.user._id;

  try {
    // only fetch items with associated user id
    const items = await Item.find({ user });

    if (!items) {
      return res.status(404).send();
    }

    res.send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

// @PATCH   /shop/:id
// edit an item
router.patch("/:id", auth, async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error);
  }
});

// @DELETE  /shop/:id
// delete an item
router.delete("/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const user = req.user._id;

  try {
    const item = await Item.findOneAndDelete({ _id, user });

    if (!item) {
      return res.status(404).send();
    }

    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

// @DELETE  /shop/:category
// delete all items within a category
router.delete("/category/:category", auth, async (req, res) => {
  const category = req.params.category;
  const user = req.user._id;

  try {
    const items = await Item.find({ category, user });

    if (!items) {
      return res.status(404).send();
    }

    Item.deleteMany({ category, user });

    // hack to return items that deleteMany will remove instead of just a count
    res.send({ items, category });
  } catch (error) {
    res.status(500).send(error);
  }
});

// @DELETE  /shop/
// delete all items
router.delete("/shop", auth, async (req, res) => {
  const user = req.user._id;

  try {
    const items = await Item.find({ user });

    if (!items) {
      return res.status(400).send();
    }

    Item.deleteMany({ user });

    // hack to return all items that deleteMany will removes instead of just a count
    res.send({ items });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
