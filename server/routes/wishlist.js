const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const User = require("../models/User");
router.route("/").put(verifyToken, async (req, res, next) => {
  const { product } = req.body;

  const { user_id } = req.user;

  try {
    const user = await User.findByIdAndUpdate(
      user_id,
      {
        $push: { wishList: { product: product._id } },
      },
      { new: true }
    )
      .populate({
        path: "wishList",

        populate: {
          path: "product",
          select: "name price description updatedAt",
        },
      })
      .select("-password");

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Something went wrong" });
  }
});
module.exports = router;
