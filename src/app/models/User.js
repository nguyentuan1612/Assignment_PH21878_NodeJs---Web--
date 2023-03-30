const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String,unique:true},
    password: { type: String, required: true },
    image: { type: String, default: "" },
    admin: { type: Boolean, default: false},
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", User);
