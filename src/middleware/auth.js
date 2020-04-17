const jwt = require("jsonwebtoken");
require("dotenv").config();

// get user model
const User = require("../models/user");

const auth = async (req, res, next) => {
  // get json token from headers
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).send({ error: "Authorization failed." });
  }

  try {
    // verify token
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedToken._id;

    // find user
    const user = await User.findOne({ _id: id }).select("-password");

    if (!user) {
      return res.status(500).send();
    }

    // attach user to the request
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
