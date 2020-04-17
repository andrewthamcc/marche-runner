const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();

// get task model for deleteMany
const Item = require("./item");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    validate(email) {
      if (!validator.isEmail(email)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// token server on user instance
userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  return token;
};

// remove password field from return of user schema
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

// authenticate a user
userSchema.statics.authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Credentials.");
  }

  const validCredentials = await bcrypt.compare(password, user.password);

  if (!validCredentials) {
    throw new Error("Invalid Credentials");
  }

  return user;
};

// pre save encrypt user password
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// pre remove delete all the associated user's items
userSchema.pre("remove", async function (next) {
  const user = this;

  await Item.deleteMany({ user: user._id });

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
