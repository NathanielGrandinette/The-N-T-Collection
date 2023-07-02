import { rest } from "msw";

// Bear in mind that without a DOM-like environment, like the jsdom from Jest, you must use absolute request URLs in NodeJS.
// mswjs.io/docs/getting-started/integrate/node
export const handlers = [
  rest.post("http://localhost:3001/user/register", null),
  rest.get("/api"),
];
