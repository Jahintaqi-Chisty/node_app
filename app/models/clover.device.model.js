const mongoose = require("mongoose");
const validator = require('validator');
const {Schema} = require("mongoose");

const DeviceLineSchema = mongoose.Schema({
    deviceId: {
        type: String,
        required: true,

    },
    model: {
        type: String,
        required: true,

    },
    serial: {
        type: String,
        required: true,

    },
    secureId: {
        type: String,
        required: true,

    },
    buildType: {
        type: String,
        required: true,

    },
    deviceTypeName: {
        type: String,
        required: true,

    },
    productName: {
        type: String,
        required: true,

    },
    pinDisabled:{
            type: Boolean,
            required:true,
            default:false
    },
    offlinePayments:{
            type: Boolean,
            required:true,
            default:false
    },

    offlinePaymentsAll: {
        type: Boolean,
            required:true,
            default:false

    },
    userId:{
        type:Schema.Types.ObjectId,
        ref: "User"
    },
    cloverConfig:{
        type:Schema.Types.ObjectId,
        ref: "CloverConfig"
    }





});

module.exports = mongoose.model("DeviceLine",DeviceLineSchema)

