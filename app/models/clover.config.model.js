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
    isAccessTokenLoaded: {
      type: Boolean,
      required: true,
      default: false,
    },
    cloverAuthCode: {
      type: String,
      required: true,
    },
    cloverServer: {
      type: String,
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

CloverConfigSchema.pre("save", function (next) {
  try {
    const config = this;
    console.log(config, this);
    if (this.isModified("state") || this.isNew) {
      if (config.state === "Production") {
        console.log("update prod");
        config.cloverServer = config.prodUrl;
      } else {
        config.cloverServer = config.testUrl;
        console.log("update dev");
      }
    }
  } catch (error) {
    next(error);
  } finally {
    next();
  }
});

CloverConfigSchema.pre("updateOne", function (next) {
  try {
    const config = this.getUpdate();
    console.log(config, this);
    if (config.state === "Production") {
      config.cloverServer = config.prodUrl;
    } else {
      config.cloverServer = config.testUrl;
    }
  } catch (error) {
    next(error);
  } finally {
    next();
  }
});

module.exports = mongoose.model("CloverConfig", CloverConfigSchema);
