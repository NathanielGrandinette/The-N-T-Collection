const request = require("supertest");
const mongoose = require("mongoose");
const { server } = require("../index");
const keys = require("../config/keys");
const { loginAsAdmin, createProduct } = require("./helpers");

jest.useRealTimers();

beforeEach(async () => {
  await mongoose.connect(keys.database.url);
});

afterEach(async () => {
  await mongoose.connection.close();
});

afterAll(() => {
  server.close();
});

describe("GET products", () => {
  it("should get all the products", async () => {
    const response = await request(server).get("/product");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("name");
  });
});

// describe("GET invalid product", () => {
//   it("should error with invalid product id", async () => {
//     const response = await request(server).get("/product/invalid");

//     expect(response.statusCode).toBe(500);
//   });
// });

describe("GET product by ID", () => {
  it("Should return a product by it's product id.", async () => {
    const response = await request(server).get(
      "/product/64869ca4317d4ca17275aa43"
    );

    const stringifyBody = JSON.stringify(response.body);

    expect(response.statusCode).toBe(200);
    expect(stringifyBody).toContain("Sony Playstation 5");
  });
});

describe("DELETE /product/:id", () => {
  it("Should Delete a product by it's ID.", async () => {
    const resFromLogin = await loginAsAdmin();

    const product = await createProduct(resFromLogin);
    const response = await request(server)
      .delete(`/product/${product._id}`)
      .set("x-access-token", resFromLogin.body.token);
    // console.log(response.body);
    expect(response.statusCode).toBe(200);
  });
});

describe("DELETE /product/:id Without Admin status", () => {
  it("Should return error trying to delete without admin status", async () => {
    const resFromLogin = await loginAsAdmin();

    const product = await createProduct(resFromLogin);

    const response = await request(server).delete(
      `/product/${product._id}`
    );

    expect(response.statusCode).toBe(403);
    expect(response.error).toBeTruthy();
  });
});
