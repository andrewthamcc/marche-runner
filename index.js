const express = require("express");
const path = require("path");

const connectDB = require("./src/mongoose/db");
connectDB();

const app = express();
app.use(express.json());

// api routes
const authRoute = require("./src/routes/auth");
const groceryRoute = require("./src/routes/grocery");
const userRoute = require("./src/routes/user");

app.use("/auth", authRoute);
app.use("/grocery", groceryRoute);
app.use("/users", userRoute);

// serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Sever running on ${port}`));
