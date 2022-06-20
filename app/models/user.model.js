const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
        isAsync: false,
      },
    },
    deviceLine: [
      {
        type: Schema.Types.ObjectId,
        ref: "DeviceLine",
      },
    ],
    cloverConfig: {
      type: Schema.Types.ObjectId,
      ref: "CloverConfig",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }
          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (err) {
    throw Error(err);
  }
};

module.exports = mongoose.model("User", UserSchema);
