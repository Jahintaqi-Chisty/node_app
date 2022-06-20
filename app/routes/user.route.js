const r = require("express").Router();
const User = require("../controllers/user.controller.js");
const auth = require("../middlewares/auth.js");

r.post("/create", User.create);
r.get("/get-all", User.findAll);

r.get("/:userId", User.findOne);

r.post("/login", User.login);
//   app.put("/user/:userId", User.update);

r.delete("/:userId", User.delete);

module.exports = r;
