const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  name: {
    type: String,
    required: true,
    maxlength: 80,
  },
  description: {
    type: String,
    maxlength: 300,
    default: "",
  },
  type: {
    type: String,
    enum: ["breakfast", "lunch", "dinner"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
