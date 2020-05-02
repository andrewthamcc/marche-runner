const express = require("express");
const router = new express.Router();

// get auth middleware
const auth = require("../middleware/auth");

// get item model
const Meal = require("../models/meal");

// @POST   /meals
// create a meal
router.post("/", auth, async (req, res) => {
  const user = req.user._id;

  // correct for timezone diff
  let date = new Date(req.body.date);
  date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  const meal = new Meal({ ...req.body, user, date });

  try {
    await meal.save();

    res.status(201).send(meal);
  } catch (error) {
    res.status(500).send(error);
  }
});

// @GET   /meals?start_date=01-01-2020&end_date=01-31-2020
// gets all meals within range
router.get("/", auth, async (req, res) => {
  const user = req.user._id;
  const start = new Date(req.query.start_date);
  const end = new Date(req.query.end_date);

  try {
    const meals = await Meal.find({
      user,
      date: { $gte: start, $lte: end },
    }).sort({ date: 1 });

    if (!meals) {
      return res.status(404).send();
    }

    res.send(meals);
  } catch (error) {
    res.status(500).send(error);
  }
});

// @PATCH /meals:id
// edit a meal
router.patch("/", auth, async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error);
  }
});

// @DELETE    /meals:id
// delete meal
router.delete("/:id", auth, async (req, res) => {
  const user = req.user._id;
  const _id = req.params.id;

  try {
    const meal = await Meal.findOneAndDelete({ _id, user });

    if (!meal) {
      return res.status(404).send();
    }

    res.send(meal);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
