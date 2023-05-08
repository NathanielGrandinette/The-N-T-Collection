const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const router = express.Router();

// route starts with /user
router.get("/", (req, res, next) => {
  res.status(200).send({ message: "user works" });
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
