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
  const _id = req.params.id;
  const user = req.user._id;

  // valid updates
  const allowedUpdates = ["name", "category", "purchased"];
  const updates = Object.keys(req.body);

  const validUpdates = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!validUpdates) {
    return res.status(400).send({ error: "Invalid update request." });
  }

  try {
    const item = await Item.findOne({ _id, user });

    if (!item) {
      return res.status(404).send;
    }

    updates.forEach((update) => (item[update] = req.body[update]));

    item.save();
    res.send(item);
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

// @DELETE  /shop/purchased
// delete all purchased items
router.delete("/delete/purchased", auth, async (req, res) => {
  const user = req.user._id;

  try {
    const items = await Item.find({ purchased: true, user });

    if (!items) {
      return res.status(404).send();
    }

    await Item.deleteMany({ purchased: true, user });

    // hack to return items that deleteMany will remove instead of just a count
    res.send({ items });
  } catch (error) {
    res.status(500).send(error);
  }
});

// @DELETE  /shop/
// delete all items
router.delete("/delete/all", auth, async (req, res) => {
  const user = req.user._id;

  try {
    const items = await Item.find({ user });

    if (!items) {
      return res.status(400).send();
    }

    await Item.deleteMany({ user });

    // hack to return all items that deleteMany will removes instead of just a count
    res.send({ items });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
