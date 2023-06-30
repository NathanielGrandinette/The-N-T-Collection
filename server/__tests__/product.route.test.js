const request = require("supertest");
const mongoose = require("mongoose");
const { server } = require("../index");

jest.useRealTimers();

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

describe("GET invalid product", () => {
  it("should error with invalid product id", async () => {
    const response = await request(server).get("/product/invalid");

    expect(response.statusCode).toBe(500);
  });
});
