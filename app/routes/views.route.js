const r = require("express").Router();

r.get("/", function (_, res) {
  res.render("pages");
});

r.get("/login", function (_, res) {
  res.render("pages/login");
});

module.exports = r;
