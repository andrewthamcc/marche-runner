const express = require("express");
const path = require("path");

const connectDB = require("./src/db/db");
connectDB();

const app = express();
app.use(express.json());

// api routes
const loginRoute = require("./src/routes/auth");
const shopRoute = require("./src/routes/shop");
const userRoute = require("./src/routes/user");

app.use("/login", loginRoute);
app.use("/shop", shopRoute);
app.use("/profile", userRoute);

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
