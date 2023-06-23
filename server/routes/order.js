const express = require("express");
const Order = require("../models/Order");
const Address = require("../models/Address");
const User = require("../models/User");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const orderList = await Order.find();
    res.status(200).send(orderList);
  })
  .post(verifyToken, async (req, res) => {
    const user = await User.findById({ _id: req.user.user_id });

    const { streetAddress, city, zip, apt, state, order } = req.body;
    const confirmationNum = Math.floor(Math.random() * 100000000);
    if (!(streetAddress || city || zip || state)) {
      return res
        .status(400)
        .send({ error: "Please provide all required information" });
    }
    if (!order) {
      return res.status(400).send({ error: "Your cart is empty" });
    }
    try {
      const newOrder = await Order.create({
        address: {
          streetAddress,
          city,
          zip,
          apt: apt ? apt : null,
          state,
        },
        order: {
          cartTotal: order.cartTotal,
          items: order.items,
          totalItems: order.totalItems,
        },
        orderOwner: req.user.user_id,
        confirmationNum: confirmationNum,
      });

      const saveAddress = await Address.create({
        address: streetAddress,
        addressLine1: apt,
        city,
        state,
        zip,
      });

      user.address = saveAddress._id;

      user.save(); //save the address to the user in db.

      return res.status(200).send(newOrder);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  });

module.exports = router;
