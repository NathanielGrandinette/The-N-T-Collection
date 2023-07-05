const request = require("supertest");
const { server } = require("../index");
const Product = require("../models/Product");

const loginAsAdmin = async () => {
  const resFromLogin = await request(server)
    .post("/user/login")
    .send({
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    });

  return resFromLogin;
};

const createProduct = async (loginAsAdmin) => {
  const product = await Product.create({
    name: "Test Product",
    price: 10,
    description: "Test Description",
    quantity: 5,
    photo: {
      name: "test.jpg",
      path: "/test/path",
      contentType: "image/jpeg",
    },
    productOwner: loginAsAdmin.body.user._id,
  });

  return product;
};

module.exports = { createProduct, loginAsAdmin };
