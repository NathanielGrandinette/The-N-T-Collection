const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      default: "User",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: ObjectId,
      ref: "Address",
    },
    role: {
      type: String,
      default: "user",
    },
    wishList: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },

        dateAdded: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
