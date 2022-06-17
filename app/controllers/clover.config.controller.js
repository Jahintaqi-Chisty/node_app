const CloverConfig = require('../models/colver.config.model');
const USER = require('../models/user.model.js');
const axios = require("axios");

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
exports.auth_rec = async (req,res)=>{
    try {
        const configObj = await CloverConfig.findOne({cloverMarchantId:req.query["merchant_id"]})
        if (configObj){
            const authCode = req.query["code"];
            configObj.cloverAuthCode = authCode;
            await configObj.save();
            res.send({message:"Successfull!"})
        }
        else {
            throw Error("No Associate Config Found!!")
        }




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
        const user = await USER.findById(req.query.userId)
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


// Get Access Token
exports.get_access_token = async (req,res) => {

    try{
        const configObj = await  CloverConfig.findById(req.params.configId);
        if(configObj){
            var URL = `${configObj.cloverServer}/oauth/token?client_id=${configObj.cloverApplicationId.split(".")[1]}&client_secret=${configObj.cloverAppSecret}&code=${configObj.cloverAuthCode}`
            console.log(URL)
            const response = await axios.get(URL).catch((err)=>{
                 res.status(err.response.status).send({"message":err.response.data.message});
            });
            res_data=response.data;
            if (res_data.hasOwnProperty('access_token')){
                configObj.cloverAccessToken = res_data.access_token;
                await configObj.save();
                res.send({"message": "Successfully saved"});
            }
            else{
                throw Error
            }
            // if (res_json)

             // axios
             //    .get(URL)
             //    .then((response) => {
             //        console.log(response.message);
             //        // res.json(response)
             //        res.send(response.data)
             //    })
             //    .catch((err) => {
             //        throw err.message
             //    });
        }
        else {
            throw Error("Not Found!!")
        }
    }
    catch (e) {
         res.status(500).send({
            message:
                e.message || "Some error occurred while retrieving messages.",
        });
    }
};