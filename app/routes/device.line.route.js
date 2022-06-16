const r = require("express").Router();
const Device = require("../controllers/clover.device.controller");

r.post("/create", Device.create);
r.get("/get-all", Device.findAll);

// r.get("/user/:userId", Device.findOne);

r.put("/:deviceId", Device.update);

// r.delete("/user/:userId", Device.delete);

module.exports = r;
