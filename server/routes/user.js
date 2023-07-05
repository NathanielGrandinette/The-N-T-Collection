const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const { validateBodyParams } = require('../middleware/ErrorHandler')

const router = express.Router();

// route starts with /user
router.get("/", async (req, res, next) => {
  const users = await User.find();
  res.status(200).send(users);
});

router
  .route("/:id")
  .get(async (req, res, next) => {
    const { id } = req.params

    try {
      const user = await User.findById(id)
      return res.status(200).send(user)
    } catch (error) {
      next()
    }
  })
  .put(validateBodyParams("name", "email", "password", "role"), async (req, res) => {
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
      next()
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(500)
        .send({ error: "Error processing your request" });
    }

    try {
      await User.findByIdAndDelete(id);
      return res.status(200).send({ success: "User deleted" });
    } catch (error) {
      next()
    }
  });

router.post("/login", validateBodyParams("email", "password"), async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkExistingUser = await User.findOne({ email });

    if (!checkExistingUser) {
      return res
        .status(404)
        .send({ error: "User account not found" });
    }

    if (await bcrypt.compare(password, checkExistingUser.password)) {
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
      return res.status(200).send({ user: user, token: user.token });
    } else {
      return res
        .status(422)
        .json({ error: "Email or Password do not match." });
    }
  } catch (error) {
    next()
  }
});

//@POST http://localhost:3001/user/register
router.post("/register", validateBodyParams("name", "email", "password", "confirmPassword"), async (req, res) => {
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
      }).select("-password");

      return res.status(201).json(newUser);
    }
  } catch (error) {
    next()
  }
});

module.exports = router;
