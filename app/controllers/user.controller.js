const USER = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  try {
    if (await USER.exists({ userName: req.body.userName })) {
      throw Error("User Already exist!!");
    }

    const user = new USER(req.body);
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving messages.",
    });
  }
};

// Retrieve all messages from the database.
exports.findAll = (req, res) => {
  USER.find()
    .populate("cloverConfig")
    .populate("deviceLine")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
    });
};

// Find a single message with a messageId
exports.findOne = (req, res) => {
  USER.findById(req.params.userId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.userId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving message with id " + req.params.userId,
      });
    });
};

exports.login = async (req, res) => {
  try {
    const user = await USER.findOne({
      userName: req.body.userName,
    });
    if (user) {
      const isValidPass = await user.comparePassword(req.body.password);
      if (isValidPass) {
        const { firstName, lastName, email, userName, isAdmin, _id } = user;
        const token = jwt.sign(
          {
            id: _id,
            firstName,
            lastName,
            email,
            userName,
            isAdmin,
          },
          "magictoken",
          {
            expiresIn: "2h",
          }
        );
        res.send({
          id: _id,
          firstName,
          lastName,
          userName,
          email,
          isAdmin,
          token,
        });
      } else {
        throw Error("Wrong password!");
      }
    } else {
      throw Error("No user failed.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Update a message identified by the messageId in the request
// exports.update = (req, res) => {
//     App.findByIdAndUpdate(
//       req.params.userId,
//       {
//         message: req.body.message,
//       },
//       { new: true }
//     )
//       .then((data) => {
//         if (!data) {
//           return res.status(404).send({
//             message: "Message not found with id " + req.params.messageId,
//           });
//         }
//         res.send(data);
//       })
//       .catch((err) => {
//         if (err.kind === "ObjectId") {
//           return res.status(404).send({
//             message: "Message not found with id " + req.params.messageId,
//           });
//         }
//         return res.status(500).send({
//           message: "Error updating message with id " + req.params.messageId,
//         });
//       });
//   };

// Delete a message with the specified messageId in the request
exports.delete = (req, res) => {
  App.findByIdAndRemove(req.params.userId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.userId,
        });
      }
      res.send({ message: "Message deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Could not delete message with id " + req.params.userId,
      });
    });
};
