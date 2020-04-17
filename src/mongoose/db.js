const mongoose = require("mongoose");
require("dotenv").config();

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${db_user}:${db_pass}@cluster0-jvant.mongodb.net/test?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
