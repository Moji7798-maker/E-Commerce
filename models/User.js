const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 32,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 32,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phoneNumberIR: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      min: 4,
      max: 32,
      uniquie: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    history: {
      type: Array,
      default: [],
    },
    role: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: false,
    },
    salt: String,
    resetPasswordLink: {
      type: String,
      default: "",
    },
    province: {
      type: String,
      default: "",
    },
    county: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.virtual("phoneNumber")
  .set(function (phoneNumber) {
    this.persianNumbers = [
      /۰/g,
      /۱/g,
      /۲/g,
      /۳/g,
      /۴/g,
      /۵/g,
      /۶/g,
      /۷/g,
      /۸/g,
      /۹/g,
    ];
    this.phoneNumberIR = this.fixNumbers(phoneNumber);
  })
  .get(function () {
    return this.phoneNumberIR;
  });

UserSchema.methods = {
  fixNumbers: function (str) {
    if (typeof str === "string") {
      for (let i = 0; i < 10; i++) {
        str = str.replace(this.persianNumbers[i], i);
      }
      return str;
    }
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  authenticate: function (plainPassword) {
    return this.encryptPassword(plainPassword) === this.hashed_password;
  },
};

module.exports = mongoose.model("User", UserSchema);
