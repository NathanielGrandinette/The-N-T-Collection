const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const router = express.Router();

// route starts with /user
router.get("/", async (req, res, next) => {
  const users = await User.find();
  res.status(200).send(users);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res
      .status(422)
      .send({ error: "Please fill out all required fields." });
  }

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
        { expiresIn: "12h" }
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
    console.log(error);
    return res.status(500).send({ error: "Something went wrong" });
  }
});

//@POST http://localhost:3001/user/register
router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !password || !confirmPassword || !email) {
    return res
      .status(422)
      .json({ error: "Please fill out all required fields." });
  } else if (password !== confirmPassword) {
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
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      return res.status(201).json(newUser);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;
