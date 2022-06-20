const CloverConfig = require('../models/clover.config.model');
const USER = require('../models/user.model.js');
const CloverDevices = require('../models/clover.device.model');
const axios = require("axios");

exports.create = async (req, res) => {
  try {
    const cloverConfig = new CloverConfig(req.body);
    const data = await cloverConfig.save();
    if (data) {
      await USER.updateOne(
        { _id: req.body.userId },
        { $set: { cloverConfig: data._id } }
      );
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving messages.",
    });
  }
};

// Retrieve all messages from the database.
exports.findAll = async (req, res) => {
  try {
    // const user = USER.findById(req.params.userId)
    // if (user.isAdmin){
    const data = await CloverConfig.find()
      .populate("deviceLine")
      .populate("userId");

    res.send(data);
    // }
    // else {
    //     res.send({"message": "You are not authorized"})
    // }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving messages.",
    });
  }
};
exports.auth_rec = async (req, res) => {
  try {
    const configObj = await CloverConfig.findOne({
      cloverMarchantId: req.query["merchant_id"],
    });
    if (configObj) {
      const authCode = req.query["code"];
      configObj.cloverAuthCode = authCode;
      await configObj.save();
      res.send({ message: "Successfull!" });
    } else {
      throw Error("No Associate Config Found!!");
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving messages.",
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
    const user = await USER.findById(req.query.userId);
    if (user.isAdmin) {
      const data = await CloverConfig.updateOne(
        { _id: req.params.configId },
        req.body,
        { runValidators: true }
      );
      if (data.acknowledged) {
        res.status(202).send({ message: "done" });
      } else {
        throw Error("Not done!Try again later.");
      }
    } else {
      res.send({ message: "You are not authorized" });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving messages.",
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
exports.get_access_token = async (req, res) => {
  try {
    const configObj = await CloverConfig.findById(req.params.configId);
    if (configObj) {
      var URL = `${configObj.cloverServer}/oauth/token?client_id=${
        configObj.cloverApplicationId.split(".")[1]
      }&client_secret=${configObj.cloverAppSecret}&code=${
        configObj.cloverAuthCode
      }`;
      console.log(URL);
      const response = await axios.get(URL);
      res_data = response.data;
      if (res_data.hasOwnProperty("access_token")) {
        configObj.cloverAccessToken = res_data.access_token;
        configObj.isAccessTokenLoaded = true;
        await configObj.save();
        res.send({ message: "Successfully saved" });
      } else {
        throw Error("No access token");
      }
    } else {
      throw Error("Not Found!!");
    }
  } catch (e) {
    res.status(500).send({
      message: e.message || "Some error occurred while retrieving messages.",
    });
  }
};

// Fetch Devices
exports.fetch_devices = async (req, res) => {
  try {
    // if (!req.body.cloverMarchantId || !req.body.cloverAccessToken) {
    //     throw Error("Please provide both Merchant Id and Access Token.");
    // }

    const configObj = await CloverConfig.findById(req.params.configId);

    URL = `${configObj.cloverServer}/v3/merchants/${configObj.cloverMarchantId}/devices`;
    const response = await axios.get(URL, {
      headers: { Authorization: `Bearer ${configObj.cloverAccessToken}` },
    });
    if (response.status !== 200) {
      throw Error(response.message);
    }
    res_data = response.data;
    const fetched_device = [];
    for (const data of res_data.elements) {
      const deviceObj = await CloverDevices.findOne({
        deviceId: data.id,
        serial: data.serial,
      });
      if (!deviceObj) {
        const cloverDevice = new CloverDevices({
          deviceId: data.id,
          model: data.id,
          serial: data.serial,
          secureId: data.secureId,
          buildType: data.buildType,
          deviceTypeName: data.deviceTypeName,
          productName: data.productName,
          pinDisabled: data.pinDisabled,
          offlinePayments: data.offlinePayments,
          offlinePaymentsAll: data.offlinePaymentsAll,
        });

        const res = await cloverDevice.save();
        await CloverConfig.updateOne(
          { _id: req.params.configId },
          { $push: { deviceLine: data._id } }
        );
        await USER.updateOne(
          { _id: req.query.userId },
          { $push: { deviceLine: data._id } }
        );
        fetched_device.push(data.serial);
      }
    }

    // res_data.elements.forEach(async (data) => {
    //     const deviceObj = await CloverDevices.findOne({deviceId: data.id, serial: data.serial});
    //     if (!deviceObj) {
    //         const cloverDevice = new CloverDevices({
    //             deviceId: data.id,
    //             model: data.id,
    //             serial: data.serial,
    //             secureId: data.secureId,
    //             buildType: data.buildType,
    //             deviceTypeName: data.deviceTypeName,
    //             productName: data.productName,
    //             pinDisabled: data.pinDisabled,
    //             offlinePayments: data.offlinePayments,
    //             offlinePaymentsAll: data.offlinePaymentsAll
    //         });
    //
    //         const res = await cloverDevice.save();
    //         await CloverConfig.updateOne({_id: req.body.cloverConfig}, {$push: {'deviceLine': data._id}})
    //         await USER.updateOne({_id: req.body.userId}, {$push: {'deviceLine': data._id}})
    //         fetched_device.push(data.serial)
    //     }
    // })
    res.send({
      sucess: true,
      total: fetched_device.length,
      fetchDevices: fetched_device,
    });
  } catch (e) {
    res.status(500).send({
      message: e.message || "Some error occurred while retrieving messages.",
    });
  }
};

