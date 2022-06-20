const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = require("mongoose");

const CloverConfigSchema = mongoose.Schema(
  {
    testUrl: {
      type: String,
      required: true,
      default: "https://sandbox.dev.clover.com",
    },
    prodUrl: {
      type: String,
      required: true,
      default: "https://www.clover.com",
    },
    cloverRegions: {
      type: String,
      required: true,
      enum: ["US", "CANADA"],
    },
    cloverApplicationId: {
      type: String,
      required: true,
    },
    cloverAppSecret: {
      type: String,
      required: true,
    },
    cloverMarchantId: {
      type: String,
      required: true,
    },
    cloverAccessToken: {
      type: String,
      required: true,
    },
    cloverAuthCode:{
         type: String,
        required: true,
    },
     cloverServer: {
        type: String,
        required: true,
    },
    state: {
      type: String,
      required: true,
      enum: ["Production", "Sandbox"],
    },
    deviceLine: [
      {
        type: Schema.Types.ObjectId,
        ref: "DeviceLine",
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CloverConfig", CloverConfigSchema);

