const USER = require("../models/user.model");
const CloverConfig = require('../models/clover.config.model');
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { body, validationResult } = require('express-validator');

const device_ping = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        configObj = await CloverConfig.findOne({_id:req.body.configId})
        if (configObj) {
            URL = `${configObj.cloverServer}/connect/v1/device/ping`;
            const options = {
                url: "https://sandbox.dev.clover.com/connect/v1/device/ping",
                method: 'POST',
                headers: {
                     "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${configObj.cloverAccessToken}`,
                    "X-Clover-Device-Id": req.body.deviceId,
                    "X-POS-ID": req.body.posId
                },
                data: {
                }
            };
            const response = await axios(options);
            if (response.status !== 200) {
                throw Error(response.message);
            }
            res.status(response.status).send({
                'status':'OK',
                'data': response.data
            })
        }
        else{
            throw Error("No Configuration Found!");
        }


        // if (response.status !== 200) {
        //     throw Error(response.message);
        // }
    } catch (err) {
        if (err.hasOwnProperty('response')){
            res.status(err.response.status).send({
            message: err.response.data || "Some error occurred while retrieving messages.",
        });
        }
        else {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving messages.",
            });
        }
    }
};

const device_status = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        configObj = await CloverConfig.findOne({_id:req.body.configId})
        if (configObj) {
            URL = `${configObj.cloverServer}/connect/v1/device/status`;
            const options = {
                url: URL,
                method: 'GET',
                headers: {
                     "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${configObj.cloverAccessToken}`,
                    "X-Clover-Device-Id": req.body.deviceId,
                    "X-POS-ID": req.body.posId
                },
                data: {
                     "beep": true,
                    "text": "Welcome!"
                }
            };
            const response = await axios(options);
            if (response.status !== 200) {
                throw Error(response.message);
            }
            res.status(response.status).send({
                'status':'OK',
                'data': response.data
            })
        }
        else{
            throw Error("No Configuration Found!");
        }


        // if (response.status !== 200) {
        //     throw Error(response.message);
        // }
    } catch (err) {
        if (err.hasOwnProperty('response')){
            res.status(err.response.status).send({
            message: err.response.data || "Some error occurred while retrieving messages.",
        });
        }
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving messages.",
        });
    }
};


const make_payment = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        configObj = await CloverConfig.findOne({_id:req.body.configId})
        if (configObj) {
            URL = `${configObj.cloverServer}/connect/v1/payments`;
            const options = {
                url: URL,
                method: 'POST',
                headers: {
                     "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${configObj.cloverAccessToken}`,
                    "X-Clover-Device-Id": req.body.deviceId,
                    "X-POS-ID": req.body.posId,
                    "Idempotency-Key": req.body.idempotencyId,
                },
                data: {
                    "amount": req.body.amount,
                    "final": true,
                    "externalPaymentId": req.body.externalPaymentId
                }
            };
            const response = await axios(options);
            if (response.status !== 200) {
                res.status(response.status).send({
                    message: response.data,
                })
            }
            else {
            //     const options2 = {
            //     url: `${configObj.cloverServer}/connect/v1/device/thank-you`,
            //     method: 'POST',
            //     headers: {
            //          "Accept": "application/json",
            //         "Content-Type": "application/json",
            //         "Authorization": `Bearer ${configObj.cloverAccessToken}`,
            //         "X-Clover-Device-Id": req.body.deviceId,
            //         "X-POS-ID": req.body.posId,
            //     },
            //     data: {}
            // };
            //     const response2 = await axios(options2);
                if (response.status !==200){
                    throw Error(response.message);
                }
                res.status(response.status).send({
                    'status': 'OK',
                    'data': response.data
                })
            }
        }
        else{
            throw Error("No Configuration Found!");
        }


        // if (response.status !== 200) {
        //     throw Error(response.message);
        // }
    } catch (err) {
        if (err.hasOwnProperty('response')){
            res.status(err.response.status).send({
            message: err.response.data,
        });
        }
        else {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving messages.",
            });
        }
    }
};

const make_refund = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        configObj = await CloverConfig.findOne({_id:req.body.configId})
        if (configObj) {
            URL = `${configObj.cloverServer}/connect/v1/payments/${req.body.paymentId}/refunds`;
            if (req.body.isFullRefund){
                datas={
                    "fullRefund": true
                }
            }
            else{
                datas={"amount": req.body.amount}
            }
            const options = {
                url: URL,
                method: 'POST',
                headers: {
                     "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${configObj.cloverAccessToken}`,
                    "X-Clover-Device-Id": req.body.deviceId,
                    "X-POS-ID": req.body.posId,
                    "Idempotency-Key": req.body.idempotencyId,
                },
                data: datas
            };
            const response = await axios(options);
            if (response.status !== 200) {
                throw Error(response.message);
            }
            else {
                const options2 = {
                url: `${configObj.cloverServer}/connect/v1/device/thank-you`,
                method: 'POST',
                headers: {
                     "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${configObj.cloverAccessToken}`,
                    "X-Clover-Device-Id": req.body.deviceId,
                    "X-POS-ID": req.body.posId,
                },
                data: {}
            };
                const response2 = await axios(options2);
                if (response2.status !==200){
                }
                res.status(response.status).send({
                    'status': 'OK',
                    'data': response.data
                })



            }
        }
        else{
            throw Error("No Configuration Found!");
        }


        // if (response.status !== 200) {
        //     throw Error(response.message);
        // }
    } catch (err) {
        if (err.hasOwnProperty('response')){
            res.status(err.response.status).send({
            message: err.response.data || "Some error occurred while retrieving messages.",
        });
        }
        else {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving messages.",
            });
        }
    }
};


module.exports = {
    device_ping,
    device_status,
    make_payment,
    make_refund
};
