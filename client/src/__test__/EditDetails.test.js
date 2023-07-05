import { screen, render, waitFor } from "@testing-library/react";
import { AuthContext } from "../context/AuthContext";
import EditDetails from "../Profile/EditDetails";

const user = {
  name: "Admin",
  _id: "6486867562d2a2fb9bf743b8",
};

test("it should render the component", () => {
  render(
    <AuthContext.Provider value={{ user }}>
      <EditDetails />
    </AuthContext.Provider>
  );
});

test("it should have 10 inputs and a button with one input with placeholder of 'optional'", () => {
  render(
    <AuthContext.Provider value={{ user }}>
      <EditDetails />
    </AuthContext.Provider>
  );

  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  const addressLine1Input = screen.getByRole("textbox", {
    name: /address line 1/i,
  });

  expect(inputs).toHaveLength(10);
  expect(button).toBeInTheDocument();
  expect(addressLine1Input).toHaveAttribute(
    "placeholder",
    "optional"
  );
});

//This component makes an axios call with the users id to get the user info. The response is mocked in the handlers response for rest.get
it("it should set the input values from the API response", async () => {
  render(
    <AuthContext.Provider value={{ user }}>
      <EditDetails />
    </AuthContext.Provider>
  );

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const cityInput = screen.getByRole("textbox", {
    name: /city/i,
  });
  const stateInput = screen.getByRole("textbox", {
    name: /state/i,
  });
  const zipInput = screen.getByRole("textbox", {
    name: /zip code/i,
  });

  await waitFor(() => {
    expect(nameInput).toHaveValue("Admin");
  });

  await waitFor(() => {
    expect(emailInput).toHaveValue("admin@admin.com");
  });

  await waitFor(() => {
    expect(cityInput).toHaveValue("Chicago");
  });
  await waitFor(() => {
    expect(stateInput).toHaveValue("IL");
  });

  await waitFor(() => {
    expect(zipInput).toHaveValue("60805");
  });
});
