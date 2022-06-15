const r = require("express").Router();
const User = require("../controllers/user.controller.js");

r.post("/create", User.create);
r.get("/get-all", User.findAll);

r.get("/user/:userId", User.findOne);

//   app.put("/user/:userId", User.update);

r.delete("/user/:userId", User.delete);

module.exports = r;
