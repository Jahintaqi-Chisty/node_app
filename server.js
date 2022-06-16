const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "ejs");

let PORT = 8080;

mongoose
  .connect(
    "mongodb+srv://jahin:jahin@cluster0.61qn6on.mongodb.net/clover-cloud?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  });

// Defining Routes
const viewRouter = require("./app/routes/views.route");
const apiRouter = require("./app/routes/user.route");
const CloverConfigRouter = require("./app/routes/colver.config.route");
const DeviceLineRouter = require("./app/routes/device.line.route");

app.use("/", viewRouter);
app.use("/api/user", apiRouter);
app.use("/api/config", CloverConfigRouter);
app.use("/api/device", DeviceLineRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
