const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const Address = require("../models/Address");
const verifyToken = require("../middleware/auth");
const { validateBodyParams } = require('../middleware/ErrorHandler')
const router = express.Router();

// route starts with /user
router
  .get("/", async (req, res, next) => {
    const users = await User.find();
    res.status(200).send(users);
  })
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
  .get(async (req, res, next) => {
    const { id } = req.params

    try {
      const user = await User.findById(id)
      return res.status(200).send(user)
    } catch (error) {
      next()
    }
  })
  .put(async (req, res) => {
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
      console.log(error)
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
      const user = await User.findById(id) 
      if(user.email === "admin@gmail.com") {
        return res.status(401).send({ error: "Cannot delete Admin"})
      }

      await User.findByIdAndDelete(id)
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
// router.post("/register", validateBodyParams("name", "email", "password", "confirmPassword"), async (req, res) => {
//   const { name, email, password, confirmPassword } = req.body;

//   const { user_id } = req.user;
//   const { id: userIdFromParams } = req.params;

//   if (
//     !name ||
//     !password ||
//     !confirmPassword ||
//     !email ||
//     !streetAddress ||
//     !city ||
//     !zip ||
//     !state ||
//     !currPassword
//   ) {
//     return res
//       .status(422)
//       .json({ error: "Please fill out all required fields." });
//   } else if (password !== confirmPassword) {
//     return res.status(422).json({ error: "Passwords must match." });
//   }
//   try {
//     // check the user id from the params against the user id in the db first
//     const checkUser = await User.findById(userIdFromParams);

//     if (user_id.toString() !== checkUser._id.toString()) {
//       return res.status(403).json({ error: "Forbidden." });
//     }

//     const checkCurrPwd = await bcrypt.compare(
//       currPassword,
//       checkUser.password
//     );

//     //check that the current password matches the password in the db.
//     if (!checkCurrPwd) {
//       return res.status(401).json({ error: "Invalid credentials." });
//     }

//     //check that the new password isn't the same as the current password in the db.
//     const checkPrevPwd = await bcrypt.compare(
//       confirmPassword,
//       checkUser.password
//     );
//     if (checkPrevPwd) {
//       return res.status(400).json({
//         error:
//           "Cannot use the same password as your current password.",
//       });
//     }

//     //hash the new password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     let user = await User.findById(user_id).populate("address");

//     user.name = name;
//     user.password = hashedPassword;
//     user.email = email;

//     const address = await Address.findByIdAndUpdate(addressId, {
//       address: streetAddress,
//       addressLine1: addressLine1 ? addressLine1 : null,
//       city,
//       state,
//       zip,
//     });

//     user.address = address._id;

//     await user.save();
//     user = user.toJSON();
//     delete user.password;
//     return res.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error });
//   }
// });

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
