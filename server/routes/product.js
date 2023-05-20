const express = require("express");
const Product = require("../models/Product");
const verifyToken = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const upload = require("../config/multer");
const User = require("../models/User");
const verifyRole = require("../middleware/role");

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const productList = await Product.find();
      return res.status(200).send(productList);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Something went wrong" });
    }
  })

  .post(verifyToken, verifyRole(['admin']), async (req, res, next) => {
    const { name, price, description, quantity } = req.body;
    
    if (!(name && price && description && quantity)) {
      return res
        .status(422)
        .send({ error: "Please fill out all required fields" });
    } else {
      try {
        const checkForProduct = await Product.findOne({ name });

        if (checkForProduct) {
          return res.status(409).send({
            error: "A product with that name already exists",
          });
        } else {
          const newProduct = await Product.create({
            name,
            price,
            description,
            quantity,
          });
          return res.status(201).send(newProduct);
        }
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .send({ error: "Something went wrong" });
      }
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
      return res
        .status(500)
        .send({ error: "No product ID provided" });
    }
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).send({ error: "Product not found" });
      } else {
        return res.status(200).send(product);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Something went wrong" });
    }
  })
  .put(verifyToken, verifyRole(['admin']), async (req, res, next) => {
    const { name, price, description, quantity } = req.body;
    const { id } = req.params;
    const userId = req.user.user_id;

    const checkIsAdmin = await User.findOne({ _id: userId });

    if (checkIsAdmin.role !== "admin") {
      return res.status(401).json({ error: "Not Authorized." });
    } else if (!id) {
      return res
        .status(409)
        .send({ error: "No product ID provided" });
    } else {
      try {
        const updateProduct = await Product.findByIdAndUpdate(id, {
          name,
          price,
          description,
          quantity,
        });
        return res.status(200).send(updateProduct);
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .send({ error: "Something went wrong" });
      }
    }
  })
  .delete(verifyToken, verifyRole(['admin']), async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.user_id;

    const checkIsAdmin = await User.findOne({ _id: userId });

    if (checkIsAdmin.role !== "admin") {
      return res.status(401).json({ error: "Not Authorized." });
    } else if (!id) {
      return res
        .status(409)
        .send({ error: "No product ID provided" });
    } else {
      try {
        const deleteProduct = await Product.findByIdAndDelete(id);
        return res.status(200).send(deleteProduct);
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .send({ error: "Something went wrong" });
      }
    }
  });

module.exports = router;
