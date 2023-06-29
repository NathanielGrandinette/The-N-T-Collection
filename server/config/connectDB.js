const mongoose = require("mongoose");
const { database } = require("./keys");

const connectDB = () => {
  mongoose.connect(database.url, {}).catch((error) => {
    console.log(error);
  });

  mongoose.connection.on("connected", () => {
    console.log("Connected to database");
  });
};

module.exports = connectDB;
