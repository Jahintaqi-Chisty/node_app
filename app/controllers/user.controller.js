const USER = require('../models/user.model.js');

exports.create = (req, res)=>{

    const user = new USER({
            firstName : req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email

    });

    user.save()
    .then(
        (data)=>{
            res.send(data);
        }

    ).catch((err)=>{
        messagae: err.message || "Some Error Occured!!"
    });
};

// Retrieve all messages from the database.
exports.findAll = (req, res) => {
    USER.find()
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