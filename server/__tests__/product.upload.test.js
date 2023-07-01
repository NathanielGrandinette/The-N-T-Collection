const request = require("supertest");
const mongoose = require("mongoose");
const { server } = require("../index");
const loginAsAdmin = require("./helpers");

jest.useRealTimers();

afterEach(async () => {
  await mongoose.connection.close();
});

afterAll(() => {
  server.close();
});

describe("POST /product", () => {
  it("Should add a product to the database and the return of the photo file path should include 'upload'", async () => {
    //res contains the response from logging in
    const res = await loginAsAdmin();

    // https://stackoverflow.com/questions/38402244/how-to-unit-test-file-upload-with-supertest-and-send-a-token
    const buffer = Buffer.from("test photo buffer");
    const response = await request(server)
      .post("/product")
      .field("name", "test product" + Math.ceil(Math.random() * 100)) //Since this endpoint also checks if there is an existing product name
      .field("price", 2.99)
      .field("description", "a test product")
      .field("quantity", 1)

      .attach("file", buffer, "path/to/test/photo.jpg")

      .field("productOwner", res.body.user._id)
      .set("x-access-token", res.body.token)
      .set("Content-Type", "multipart/form-data");

    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.photo.path).toEqual(
      expect.stringMatching("uploads")
    );
    expect(response.statusCode).toBe(201);
  });
});
