const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    ip: { type: String },
    os: { type: String },
    browser: { type: String },
  },
  { timestamps: true }
);

module.exports = { userModel: mongoose.model("user", userSchema) };
