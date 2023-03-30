const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const Product = new Schema(
  {
    name: { type: String, max: 20, required: true },
    category: String,
    color: { type: String, max: 20, required: true },
    image: { type: String, default: "" },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", Product);
