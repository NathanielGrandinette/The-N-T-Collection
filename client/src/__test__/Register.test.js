import {
  screen,
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { server } from "../mocks/server";
import user from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Register from "../pages/Register/Register";

const RenderRegister = () => {
  return (
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
};

// // Currently Not using
beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
// // Currently Not using

test("It should render a submit button", () => {
  render(<RenderRegister />);

  const submitBtn = screen.getByRole("button", {
    name: /submit/i,
  });

  expect(submitBtn.type).toBe("submit");
});

test("Displays Have an account link and has a class of hover blue", async () => {
  render(<RenderRegister />);
  const link = screen.getByRole("link", {
    name: /have an account\?/i,
  });

  expect(link).toBeInTheDocument();
  expect(link).toHaveClass("hover:blue");
});

test("It should submit the form with values, show loading button, and loading button stops after successful response.", async () => {
  render(<RenderRegister />);

  //get inputs

  const nameInput = screen.getByRole("textbox", {
    name: /name:/i,
  });
  const emailInput = screen.getByRole("textbox", {
    name: /email:/i,
  });
  const passwordInput = screen.getByTestId(/password1/i);

  const confirmPasswordInput =
    screen.getByLabelText(/confirm password:/i);
  const submitButton = screen.getByRole("button", { name: "Submit" });

  /*Clicking and Typing */
  user.click(nameInput);
  user.keyboard("Test User");

  user.click(emailInput);
  user.keyboard("TESTTTT@aol.com");

  user.click(passwordInput);
  user.keyboard("test123456");

  user.click(confirmPasswordInput);
  user.keyboard("test123456");
  /*Clicking and Typing */

  fireEvent.click(submitButton);

  const loadingState = screen.getByTestId("loader");

  //After click, the button will be the loader
  await waitFor(() => {
    expect(loadingState).toBeInTheDocument();
  });

  //wait for loading to stop

  await waitForElementToBeRemoved(
    () => screen.queryByTestId("loader"),
    { timeout: 5000 }
  );
});

test("It should set the formData back to initial values after successful response.", async () => {
  jest.useFakeTimers();
  render(<RenderRegister />);

  //get inputs

  const nameInput = screen.getByRole("textbox", {
    name: /name:/i,
  });
  const emailInput = screen.getByRole("textbox", {
    name: /email:/i,
  });
  const passwordInput = screen.getByTestId(/password1/i);

  const confirmPasswordInput =
    screen.getByLabelText(/confirm password:/i);
  const submitButton = screen.getByRole("button", { name: "Submit" });

  /*Clicking and Typing */
  user.click(nameInput);
  user.keyboard("Test User");

  user.click(emailInput);
  user.keyboard("TESTTTT@aol.com");

  user.click(passwordInput);
  user.keyboard("test123456");

  user.click(confirmPasswordInput);
  user.keyboard("test123456");
  /*Clicking and Typing */

  fireEvent.click(submitButton);

  act(() => {
    //Since there is a setTimeOut in the handleSubmitForm
    jest.advanceTimersByTime(1000);
  });

  await waitFor(() => {
    expect(nameInput.value).toBe("");
  });

  await waitFor(() => {
    expect(emailInput.value).toBe("");
  });

  await waitFor(() => {
    expect(passwordInput.value).toBe("");
  });

  await waitFor(() => {
    expect(confirmPasswordInput.value).toBe("");
  });
});

test("it shows 4 inputs and a button", () => {
  render(<RenderRegister />);

  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  expect(inputs).toHaveLength(4);
  expect(button).toBeInTheDocument();
});
