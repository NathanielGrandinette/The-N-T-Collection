const express = require("express");
const Product = require("../models/Product");
const verifyToken = require("../middleware/auth");
const upload = require("../config/multer");
const User = require("../models/User");
const verifyRole = require("../middleware/role");
const deleteProductImage = require("../utils/deleteProductImage");
const { validateBodyParams } = require("../middleware/ErrorHandler");
const cloudinary = require("../middleware/cloudinary");

const router = express.Router();

const populateProductOwner = {
  path: "productOwner",
  select: "email",
};

/**
 * GET /product
 * @description an endpoint to get all the products.
 */
router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const productList = await Product.find().populate(
        populateProductOwner
      );
      return res.status(200).send(productList);
    } catch (error) {
      next();
    }
  })
  /**
   * POST /product
   * Protected Route
   */
  .post(
    verifyToken,
    verifyRole(["admin"]),
    upload,
    async (req, res, next) => {
      const { name, price, description, quantity, category } =
        req.body;
      //If the these fields are undefined, it means the admin clicked "cancel" when they were adding a new product
      //This is a side effect so let's just send a message right away, to give some user notification instead of just being an error.
      if (
        name === "undefined" ||
        price === "undefined" ||
        description === "undefined " ||
        quantity === "undefined"
      ) {
        return res
          .status(400)
          .json({ error: "Add new product Canceled." });
      }

      if (!req.file) {
        return res
          .status(400)
          .json({ error: "Please include a product image." });
      }
      const { path, originalname, mimetype } = req.file;

      if (!(name && price && description && quantity && path)) {
        return res
          .status(422)
          .send({ error: "Please fill out all required fields" });
      } else {
        try {
          const checkForProduct = await Product.findOne({ name });

          //upload image to cloudinary
          const imageResult = await cloudinary.uploader.upload(path, {
            public_id: name, // keep product name in cloudinary file name.
            transformation: [
              {
                dpr: "auto",
                responsive: true,
                width: "auto",
                crop: "scale",
                angle: 20,
                fetch_format: "webp",
              },
              {
                border: "3px_solid_rgb:00390b",
                radius: 20,
              },
            ],
          });

          if (checkForProduct) {
            return res.status(409).send({
              error: "A product with that name already exists",
            });
          } else {
            const newProduct = await Product.create({
              name,
              price,
              description,
              category,
              quantity,
              photo: {
                name: originalname,
                path: imageResult.secure_url,
                contentType: mimetype,
                cloudinaryId: imageResult.public_id,
              },
              productOwner: req.user.user_id,
            });
            return res.status(201).send(newProduct);
          }
        } catch (error) {
          next(error);
        }
      }
    }
  );
/**
 * GET /product/:id
 * @description Endpoint to get a product by it's id.
 */
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
      next();
    }
  })
  /**
   * PUT /product/:id
   * @description Endpoint to edit a product. If there is a req.file then update the whole product, if not then only the fields provided.
   * Protected
   */
  .put(
    verifyToken,
    verifyRole(["admin"]),
    upload, //multer middleware
    async (req, res, next) => {
      const { id } = req.params;
      const userId = req.user.user_id;
      const { name, price, description, quantity, category } =
        req.body;

      if (!id) {
        return res
          .status(409)
          .send({ error: "No product ID provided" });
      }
      try {
        let product = await Product.findById(id);

        /**
         * Commented out on purpose
         * If this app is in production
         * Only the product owner can edit the product
         */
        // if (process.env.NODE_ENV === "production") {
        //   //used in production, easier to test other products in dev.
        //   if (product.productOwner.toString() !== userId) {
        //     return res
        //       .status(401)
        //       .json({ error: "You can only edit your products." });
        //   }
        // }

        const checkIsAdmin = await User.findOne({ _id: userId });

        if (checkIsAdmin.role !== "admin") {
          return res.status(401).json({ error: "Not Authorized." });
        }

        //if there is a file then  update the whole product, if not, only update the ones provided.
        if (req.file) {
          const { path, originalname, mimetype } = req.file;

          //upload image to cloudinary
          const imageResult = await cloudinary.uploader.upload(path, {
            public_id: name, // keep product name in cloudinary file name.
            overwrite: true,
            transformation: [
              {
                dpr: "auto",
                responsive: true,
                width: "auto",
                crop: "scale",
                fetch_format: "webp",
              },
              {
                border: "3px_solid_rgb:00390b",
                radius: 20,
              },
            ],
          });

          if (imageResult) {
            const updateProduct = await Product.findByIdAndUpdate(
              id,
              {
                name,
                price,
                description,
                category,
                quantity,
                photo: {
                  name: originalname,
                  path: imageResult.secure_url,
                  contentType: mimetype,
                  cloudinaryId: imageResult.public_id,
                },
              }
            );
            return res.status(200).send(updateProduct);
          } else {
            res.status(500).json({ error: "Something went wrong." });
          }
        }

        if (price) {
          product.price = price;
        }
        if (description) {
          product.description = description;
        }

        if (quantity) {
          product.quantity = quantity;
        }

        if (name) {
          product.name = name;
        }
        if (category) {
          product.category = category;
        }

        await product.save();
        product = product.toJSON();
        res.status(200).json(product);
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .send({ error: "Something went wrong" });
      }
    }
  )
  /**
   * DELETE /product/:id
   * Protected
   */
  .delete(
    verifyToken,
    verifyRole(["admin"]),
    async (req, res, next) => {
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

          await deleteProductImage(deleteProduct);

          return res.status(200).send(deleteProduct);
        } catch (error) {
          console.log(error);
          return res
            .status(500)
            .send({ error: "Something went wrong" });
        }
      }
    }
  );
/**
 * PUT /product/featured/:productId
 * Protected
 */
router.route("/featured/:productId").put(
  verifyToken,
  verifyRole(["admin"]),

  async (req, res, next) => {
    const { isFeatured } = req.body;

    const { productId } = req.params;

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
  }
);

module.exports = router;
