const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
router
  .route("productdetail/product/wishlist")
  .put(async (req, res, next) => {
    const { isFeatured } = req.body;

    const { productId } = req.params;

    const { user } = req.user;

    console.log(user);

    try {
      const updateProduct = await Product.findByIdAndUpdate(
        productId,
        {
          featured: isFeatured ? isFeatured : false,
        }
      );
      return res.status(200).send(updateProduct);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Something went wrong" });
    }
  });
module.exports = router;
