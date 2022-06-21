const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw Error("Not Authorized");
    } else {
      const decodedToken = jwt.verify(token, "magictoken");
      const user = decodedToken;
      req.auth = user;
      console.log(user);
      next();
    }
  } catch (error) {
    res.status(401).send(error);
  }
};
