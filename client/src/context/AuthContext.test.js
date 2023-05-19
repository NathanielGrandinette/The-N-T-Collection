// auth.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthContext, ProvideAuth } from "./AuthContext";

describe("ProvideAuth", () => {
  test("renders children with AuthContext value", () => {
    const { getByText } = render(
      <ProvideAuth>
        <AuthContext.Consumer>
          {({ user }) => <div>Hello, {user?.name}</div>}
        </AuthContext.Consumer>
      </ProvideAuth>
    );
  });

  test("updates user state based on localStorage", () => {
    const storedUser = { name: "John Doe" };
    localStorage.setItem("n-t-user", JSON.stringify(storedUser));

    const { getByText } = render(
      <ProvideAuth>
        <AuthContext.Consumer>
          {({ user }) => (
            <div>Logged in as: {user ? user.name : "null"}</div>
          )}
        </AuthContext.Consumer>
      </ProvideAuth>
    );

    const loggedInUser = getByText("Logged in as: John Doe");
    expect(loggedInUser).toBeInTheDocument();

    localStorage.removeItem("n-t-user");
  });
});
