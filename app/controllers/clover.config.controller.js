const CloverConfig = require('../models/colver.config.model');
const USER = require('../models/user.model.js');

exports.create = async (req, res) => {


    try {
        const cloverConfig = new CloverConfig(req.body);
        const data = await cloverConfig.save()
        if (data) {
            await USER.updateOne({_id:req.body.userId},{$set:{'cloverConfig':data._id}})
            res.send(data)
        }
    } catch (err) {
         res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving messages.",
            });
    }

};

// Retrieve all messages from the database.
exports.findAll = async (req, res) => {
     try {
         // const user = USER.findById(req.params.userId)
         // if (user.isAdmin){
         const data = await CloverConfig.find().populate('deviceLine').populate('userId')

         res.send(data)
         // }
         // else {
         //     res.send({"message": "You are not authorized"})
         // }
     }
     catch (err){
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving messages.",
            });
     }
};

//   // Find a single message with a messageId
// exports.findOne = (req, res) => {
//     USER.findById(req.params.userId)
//       .then((data) => {
//         if (!data) {
//           return res.status(404).send({
//             message: "Message not found with id " + req.params.userId,
//           });
//         }
//         res.send(data);
//       })
//       .catch((err) => {
//         if (err.kind === "ObjectId") {
//           return res.status(404).send({
//             message: "Message not found with id " + req.params.userId,
//           });
//         }
//         return res.status(500).send({
//           message: "Error retrieving message with id " + req.params.userId,
//         });
//       });
//   };
//
//   Update a message identified by the messageId in the request
exports.update = async (req, res) => {
    try {
        const user = USER.findById(req.params.userId)
        if (user.isAdmin){
            const data = await CloverConfig.updateOne({_id:req.params.configId},req.body, (err,data)=>{
                if (err){
                    throw err
                }
                else{
                    res.send(data);
                }
            });

        }
        else{
            res.send({"message": "You are not authorized"})
            }
        }

    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving messages.",
        });

    }

    };



//
// // Delete a message with the specified messageId in the request
// exports.delete = (req, res) => {
//     App.findByIdAndRemove(req.params.userId)
//       .then((data) => {
//         if (!data) {
//           return res.status(404).send({
//             message: "Message not found with id " + req.params.userId,
//           });
//         }
//         res.send({ message: "Message deleted successfully!" });
//       })
//       .catch((err) => {
//         if (err.kind === "ObjectId" || err.name === "NotFound") {
//           return res.status(404).send({
//             message: "Message not found with id " + req.params.userId,
//           });
//         }
//         return res.status(500).send({
//           message: "Could not delete message with id " + req.params.userId,
//         });
//       });
//   };