const r = require("express").Router();
const Config = require("../controllers/clover.config.controller.js");

r.post("/create", Config.create);
r.get("/get-all", Config.findAll);

// r.get("/user/:userId", User.findOne);
//
r.put("/:configId", Config.update);
r.get("/clover/authrcv", Config.auth_rec);
r.post("/:configId/get-access-token", Config.get_access_token);
r.post("/:configId/fetch_devices", Config.fetch_devices);

//
// r.delete("/user/:userId", User.delete);

// dont write any routes/code below this or this route will be ignored as 404.
r.all("*", (_, res) => {
  res.status(404).send({ message: "Not Found" });
});

module.exports = r;

