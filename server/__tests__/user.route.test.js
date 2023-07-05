const request = require("supertest");
const mongoose = require("mongoose");
const { server } = require("../index");
const keys = require("../config/keys");

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

describe("GET users", () => {
  it("Should get all the users", async () => {
    const response = await request(server).get("/user");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("name");
  });
});

describe("GET invalid user", () => {
  it("Should error with invalid user ID", async () => {
    const response = await request(server).get("/user/invalid");

    expect(response.statusCode).toBe(404);
  });
});

describe("GET user by ID", () => {
  it("Should return a user by it's id.", async () => {
    const response = await request(server).get(
      "/user/6486867562d2a2fb9bf743b8"
    );

    const stringifyBody = JSON.stringify(response.body);

    expect(response.statusCode).toBe(200);
    expect(stringifyBody).toContain("Admin");
  });
});