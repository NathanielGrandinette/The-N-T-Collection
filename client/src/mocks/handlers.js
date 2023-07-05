import { rest } from "msw";

// Bear in mind that without a DOM-like environment, like the jsdom from Jest, you must use absolute request URLs in NodeJS.
// mswjs.io/docs/getting-started/integrate/node
export const handlers = [
  rest.post(
    "http://localhost:3001/user/register",
    (req, res, ctx) => {
      const { name, email } = req.body;

      return res(
        ctx.status(201),
        ctx.json({
          createdAt: "2023-07-05T01:59:07.834Z",
          email: `${email}`,
          name: `${name}`,
          role: "user",
          updatedAt: "2023-07-05T01:59:07.834Z",
          userType: "User",
          wishList: [],
          __v: 0,
          _id: "64a4ce6b30eca09919a26b1a",
        })
      );
    }
  ),
  rest.get("/api"),
  rest.get(
    "http://localhost/user/6486867562d2a2fb9bf743b8",
    (req, res, ctx) => {
      return res(
        ctx.json({
          _id: "6486867562d2a2fb9bf743b8", //admin user id.
          name: "Admin",
          email: "admin@admin.com",
          address: "1234 main street",
          city: "Chicago",
          state: "IL",
          zip: "60805",
        })
      );
    }
  ),
];
