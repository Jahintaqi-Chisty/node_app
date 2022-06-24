const r = require("express").Router();
const Device = require("../controllers/clover.device.controller");

r.post("/create", Device.create);
r.get("/get-all", Device.findAll);

// r.get("/user/:userId", Device.findOne);

r.put("/:deviceId", Device.update);

// r.delete("/user/:userId", Device.delete);

// dont write any routes/code below this or this route will be ignored as 404.
r.all("*", (_, res) => {
  res.status(404).send({ message: "Not Found" });
});

module.exports = r;
