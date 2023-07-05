const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const User = require("../models/User");

router
  .route("/")
  .get(verifyToken, async (req, res, next) => {
    const { user_id } = req.user;

    try {
      const currUser = await User.findOne({ _id: user_id }).populate({
        path: "wishList.product",
        select:
          " photo.path name price description updatedAt quantity",
      });

      const wishListItems = currUser.wishList.map((item) => {
        const { product, dateAdded } = item ?? {};
        const { name, price, photo, description, quantity, _id } =
          product ?? {};

        return {
          _id,
          name,
          price,
          dateAdded,
          photo,
          description,
          quantity,
        };
      });

      return res.status(200).send({ list: wishListItems });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Something went wrong" });
    }
  })

  //endpoint to add item to wishlist
  //if item is already in wishlist,
  //it will remove that item from it
  .put(verifyToken, async (req, res, next) => {
    const { product } = req.body;

    const { user_id } = req.user;

    try {
      const currUser = await User.findOne({ _id: user_id });

      if (!currUser) {
        return res.status(404).json({ error: "User not found." });
      }

      const checkIfItemIsWished = currUser.wishList.find(
        (item) =>
          item.product?._id.toString() === product?._id.toString()
      );

      if (checkIfItemIsWished) {
        const user = await User.findByIdAndUpdate(
          user_id,
          {
            $pull: { wishList: { product: product._id } },
          },
          { new: true }
        )
          .populate({
            path: "wishList",

            populate: {
              path: "product",
              select: " photo.path name price description updatedAt",
            },
          })
          .select("-password");

        const wishListItems = user.wishList.map((item) => {
          const { product, dateAdded } = item ?? {};
          const { name, price, photo, description, quantity, _id } =
            product ?? {};

          return {
            _id,
            name,
            price,
            dateAdded,
            photo,
            description,
            quantity,
          };
        });

        return res.status(200).send({ list: wishListItems });
      } else {
        const user = await User.findByIdAndUpdate(
          user_id,
          {
            $addToSet: { wishList: { product: product._id } },
          },
          { new: true }
        )
          .populate({
            path: "wishList",

            populate: {
              path: "product",
              select: " photo.path name price description updatedAt",
            },
          })
          .select("-password");

        return res.status(200).send({ list: user.wishList });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Something went wrong" });
    }
  });
module.exports = router;
