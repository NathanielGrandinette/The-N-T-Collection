import { rest } from "msw";

// Bear in mind that without a DOM-like environment, like the jsdom from Jest, you must use absolute request URLs in NodeJS.
// mswjs.io/docs/getting-started/integrate/node
export const handlers = [
  rest.post("http://localhost:3001/user/register", null),
  rest.get("/api"),
  rest.get(
    "http://localhost/user/6486867562d2a2fb9bf743b8",
    (req, res, ctx) => {
      return res(
        ctx.json({
          _id: "6486867562d2a2fb9bf743b8",
          name: "Admin",
          email: "admin@admin.com",
          address: "1234 main street",
          city: "Chicago",
          state: "IL",
          zip: "60805"
        })
      );
    }
  ), //admin user id.
];
