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

r.post("/make/payment",
    body('configId').isString().notEmpty(),
    body('deviceId').isString().notEmpty(),
    body('posId').notEmpty().isString(),
    body('idempotencyId').notEmpty().isString(),
    body('amount').notEmpty().isInt(),
    body('externalPaymentId').notEmpty().isString(),

    CloudApi.make_payment);

r.post("/make/refund",
    body('configId').isString().notEmpty(),
    body('deviceId').isString().notEmpty(),
    body('posId').notEmpty().isString(),
    body('idempotencyId').notEmpty().isString(),
    body('amount').notEmpty().isInt(),
    body('isFullRefund').notEmpty().isBoolean(),
    body('externalPaymentId').notEmpty().isString(),
    body('paymentId').notEmpty().isString(),

    CloudApi.make_refund);



module.exports = r;
