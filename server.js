const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const hbs = require("hbs");
const logger = require("morgan");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

hbs.registerPartials(path.join(__dirname, "app/views/partials"), (err) => {});
// for (let helper in helpers) {
//   hbs.registerHelper(helper, helpers[helper]);
// }

app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "hbs");

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
// const viewRouter = require("./app/routes/views.route");
const apiRouter = require("./app/routes/user.route");
const CloverConfigRouter = require("./app/routes/colver.config.route");
const DeviceLineRouter = require("./app/routes/device.line.route");

// app.use("/", viewRouter);
app.use("/api/user", apiRouter);
app.use("/api/config", CloverConfigRouter);
app.use("/api/device", DeviceLineRouter);
// app.use("*", function (req, res) {
//   console.log("404ing");
//   res.render("404");
// });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
