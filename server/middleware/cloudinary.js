const keys = require("../config/keys");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: keys.cloudinary.cloud_name,
  api_key: keys.cloudinary.api_key,
    api_secret: keys.cloudinary.api_secret,

});

module.exports = cloudinary;
