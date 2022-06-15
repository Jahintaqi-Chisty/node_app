module.exports = (app) => {
  const User = require("../controllers/user.controller.js");

  app.post("/create", User.create);
  app.get("/get-all", User.findAll);

  app.get("/user/:userId", User.findOne);

//   app.put("/user/:userId", User.update);

  app.delete("/user/:userId", User.delete);
};
