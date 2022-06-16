const r = require("express").Router();
const Config = require("../controllers/clover.config.controller.js");

r.post("/create", Config.create);
r.get("/get-all", Config.findAll);

// r.get("/user/:userId", User.findOne);
//
r.put("/:configId", Config.update);
//
// r.delete("/user/:userId", User.delete);

module.exports = r;
