const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const addressRouter = require("./routes/address");
const path = require("path");
const { database } = require("./config/keys");

const app = express();

mongoose.connect(database.url, {}).catch((error) => {
  console.log(error);
});

mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", router);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/address", addressRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.all("*", (req, res, next) => {
    res.sendFile(
      path.resolve(__dirname, "../client/build/index.html")
    );
  });
}

app.listen(3001, function (error) {
  if (error) {
    console.log(error);
  }
  console.log("Server listening on port", process.env.PORT);
});

module.exports = app;
