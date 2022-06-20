const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
let PORT = 8081;

app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("combined"));

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
// const viewRouter = require("./app/routes/views.route");
const apiRouter = require("./app/routes/user.route");
const CloverConfigRouter = require("./app/routes/colver.config.route");
const DeviceLineRouter = require("./app/routes/device.line.route");

// app.use("/", viewRouter);
app.use("/api/user", apiRouter);
app.use("/api/config", CloverConfigRouter);
app.use("/api/device", DeviceLineRouter);

app.get("/*", (_, res) => {
  fs.access("client/build/index.html", (err) => {
    if (err) {
      console.log(err);
      res.send("Please, Build the react app!");
    } else {
      console.log("found");
      res.sendFile(path.join(__dirname, "client/build", "index.html"));
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
