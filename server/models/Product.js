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
  photo: {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
  },
  featured: {
    type: Boolean,
  },
  productOwner: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
