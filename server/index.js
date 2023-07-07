const dotenv = require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const addressRouter = require("./routes/address");
const wishlistRouter = require("./routes/wishlist");
const orderRouter = require("./routes/order");
const path = require("path");
const connectDB = require("./config/connectDB");
const { ErrorHandler } = require("./middleware/ErrorHandler");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", router);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/address", addressRouter);
app.use("/wishlist", wishlistRouter);
app.use("/order", orderRouter);

//error handling
app.use(ErrorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client", "build")));

  app.all("*", (req, res, next) => {
    res.sendFile(
      path.join(__dirname, "../client", "build", "index.html"));
  });
}

const server = app.listen(3001, function (error) {
  if (error) {
    console.log(error);
  }
  console.log("Server listening on port", process.env.PORT);
});

module.exports = { server, app };
