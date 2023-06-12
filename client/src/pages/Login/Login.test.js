import {
  render,
  screen,
  renderHook,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { AuthContext } from "../../context/AuthContext";
import React from "react";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";

// Tests that the email and password input fields are present in the Login component.
it("test_textfields_presence", () => {
  const setUser = jest.fn();
  jest.spyOn(React, "useContext").mockReturnValue({ setUser });

  jest.spyOn(require("axios"), "post").mockResolvedValueOnce({
    data: { token: "test_token", user: { name: "test_user" } },
  });
  render(<Login />);
  const emailInput = screen.getByLabelText("Email:");
  const passwordInput = screen.getByLabelText("Password:");
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});
