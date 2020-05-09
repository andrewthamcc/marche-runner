const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: [
      "bakery",
      "beverage",
      "dairy",
      "dry", // dry & canned goods
      "frozen",
      "household",
      "meat",
      "prepared", // deli & prepared
      "pharmacy", // pharmacy & personal
      "produce",
      "seafood",
      "snack",
    ],
    trim: true,
    lowercase: true,
    required: true,
  },
  purchased: {
    type: Boolean,
    default: false,
  },
});

const Item = mongoose.model("item", itemSchema);

module.exports = Item;
