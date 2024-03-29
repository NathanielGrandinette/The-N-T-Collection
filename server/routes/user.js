const express = require("express");
const User = require("../models/User");
const Address = require("../models/Address");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const verifyToken = require("../middleware/auth");
const verifyRole = require("../middleware/role");
const { validateBodyParams } = require("../middleware/ErrorHandler");
const router = express.Router();

/**
 * GET /user
 *  @description this route is a GET request to get all users.
 *  protected
 */
router
  .get(
    "/",
    verifyToken,
    verifyRole(["admin"]),
    async (req, res, next) => {
      const users = await User.find();
      res.status(200).send(users);
    }
  )
  /**
   * GET /user/:id
   * @description This route is a GET request for a user to view their own information.
   * @param {string} user id
   * @returns {object}
   * protected
   */
  .get("/:id", verifyToken, async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id)
      .select("-password -role -userType -wishList")
      .populate({ path: "address" });

    if (user._id.toString() !== req.user.user_id.toString()) {
      return res.status(403).json({ error: "Forbidden." });
    }

    res.status(200).json(user);
  });

router
  .route("/:id")
  /**
   * PUT /user/:id
   */
  .put(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const { id } = req.params;

    try {
      const user = await User.findByIdAndUpdate(id, {
        name,
        email,
        password,
        role,
      });

      return res.status(200).send(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })

  /**
   *  DELETE /user/:id
   */

  .delete(async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(500)
        .send({ error: "Error processing your request" });
    }

    try {
      const user = await User.findById(id);
      if (user.email === "admin@gmail.com") {
        return res.status(401).send({ error: "Cannot delete Admin" });
      }

      await User.findByIdAndDelete(id);
      return res.status(200).send({ success: "User deleted" });
    } catch (error) {
      next(error);
    }
  });
/**
 * POST /user/login
 *
 */
router.post(
  "/login",
  validateBodyParams("email", "password"),
  async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const checkExistingUser = await User.findOne({ email });

      if (!checkExistingUser) {
        return res
          .status(404)
          .send({ error: "User account not found" });
      }

      if (
        await bcrypt.compare(password, checkExistingUser.password)
      ) {
        const token = jwt.sign(
          {
            user_id: checkExistingUser._id,
            email,
            role: checkExistingUser.role,
          },
          keys.jwt.secret,
          { expiresIn: "1d" }
        );

        const user = await User.findById({
          _id: checkExistingUser._id,
        }).select("-password"); //lets send back the user minus the password hash.

        user.token = token;
        return res
          .status(200)
          .send({ user: user, token: user.token });
      } else {
        return res
          .status(422)
          .json({ error: "Email or Password do not match." });
      }
    } catch (error) {
      next(error);
    }
  }
);
/**
 * PATCH /user/edit/:id
 */
router.patch(
  "/edit/:id",
  verifyToken,
  validateBodyParams(
    "name",
    "email",
    "password",
    "confirmPassword",
    "address",
    "city",
    "zip",
    "state",
    "currPassword"
  ),
  async (req, res, next) => {
    const {
      name,
      email,
      password,
      confirmPassword,
      address: streetAddress,
      addressLine1,
      city,
      zip,
      state,
      currPassword,
      _id: addressId,
    } = req.body;

    const { user_id } = req.user;
    const { id: userIdFromParams } = req.params;

    if (password !== confirmPassword) {
      return res.status(422).json({ error: "Passwords must match." });
    }
    try {
      // check the user id from the params against the user id in the db first
      const checkUser = await User.findById(userIdFromParams);

      if (user_id.toString() !== checkUser._id.toString()) {
        return res.status(403).json({ error: "Forbidden." });
      }

      const checkCurrPwd = await bcrypt.compare(
        currPassword,
        checkUser.password
      );

      //check that the current password matches the password in the db.
      if (!checkCurrPwd) {
        return res
          .status(401)
          .json({ error: "Invalid credentials." });
      }

      //check that the new password isn't the same as the current password in the db.
      const checkPrevPwd = await bcrypt.compare(
        confirmPassword,
        checkUser.password
      );
      if (checkPrevPwd) {
        return res.status(400).json({
          error:
            "Cannot use the same password as your current password.",
        });
      }

      //hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      let user = await User.findById(user_id).populate("address");

      user.name = name;
      user.password = hashedPassword;
      user.email = email;

      const address = await Address.findByIdAndUpdate(addressId, {
        address: streetAddress,
        addressLine1: addressLine1 ? addressLine1 : null,
        city,
        state,
        zip,
      });

      user.address = address._id;

      await user.save();
      user = user.toJSON();
      delete user.password;
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

/**
 * POST
 * /user/register
 */
router.post(
  "/register",
  validateBodyParams("name", "email", "password", "confirmPassword"),
  async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(422).json({ error: "Passwords must match." });
    }

    try {
      const checkForUser = await User.findOne({ email }); //lets find by email

      if (checkForUser) {
        return res.status(409).json({
          error: "A user already exists with that information.",
        }); //409 code means conflict.
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser = await User.create({
          name,
          email,
          password: hashedPassword,
        });

        newUser = newUser.toJSON();
        delete newUser.password;

        return res.status(201).json(newUser);
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
