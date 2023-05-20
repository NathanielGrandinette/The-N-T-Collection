const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  photos: {
    type: [String],
    default: "server/assets/productImages/place-holder.png",
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
