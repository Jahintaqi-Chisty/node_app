const r = require("express").Router();

r.get("/", function (_, res) {
  res.render("");
});

r.get("/login", function (_, res) {
  res.render("login");
});

module.exports = r;
