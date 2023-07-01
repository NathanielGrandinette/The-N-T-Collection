const request = require("supertest");
const { server } = require("../index");

const loginAsAdmin = async () => {
  const resFromLogin = await request(server)
    .post("/user/login")
    .send({
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    });

  return resFromLogin;
};

module.exports = loginAsAdmin;
