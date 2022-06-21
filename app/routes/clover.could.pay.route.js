const r = require("express").Router();
const CloudApi = require("../controllers/clover.cloud.pay.controller");
const auth = require("../middlewares/auth.js");
const { body } = require('express-validator');

r.post("/device/connect",
     body('configId').isString().notEmpty(),
    body('deviceId').isString().notEmpty(),
    body('posId').isString().notEmpty(),
    CloudApi.device_ping);

r.post("/device/status",
    body('configId').isString().notEmpty(),
    body('deviceId').isString().notEmpty(),
    body('posId').notEmpty().isString(),
    CloudApi.device_status);


module.exports = r;
