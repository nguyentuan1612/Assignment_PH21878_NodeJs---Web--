const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const User = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, validate: [isEmail, 'invalid email'] },
    password: { type: String, required: true },
    image: { type: String, default: "" },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", User);
