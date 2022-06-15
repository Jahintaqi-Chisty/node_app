const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.json({ message: "Server is running :D" });
});

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
require("./app/routes/user.route.js")(app);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

