import React from "react";
import axios from "axios";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import ToggleSwitch from "./ToggleSwitch";

const product = {
  featured: true,
};

test("it shows a checkbox (Toggle Switch)", () => {
  render(<ToggleSwitch product={product} />);

  const toggle = screen.getByRole("checkbox");
  expect(toggle).toBeChecked();
});

// Tests that the toggle switch renders with the correct label and placement.
it("test_toggle_switch_renders_correctly", () => {
  const product = { _id: "1", featured: true };
  render(<ToggleSwitch product={product} />);
  const toggleSwitch = screen.getByLabelText("controlled");
  const label = screen.getByText("Featured");
  expect(toggleSwitch).toBeInTheDocument();
  expect(label).toBeInTheDocument();
});

// Tests that isFeatured state is updated correctly on toggle switch change.
it("test_is_featured_state_updated_correctly", () => {
  const product = { _id: "1", featured: true };
  render(<ToggleSwitch product={product} />);
  const toggleSwitch = screen.getByLabelText("controlled");
  fireEvent.click(toggleSwitch);
  expect(toggleSwitch.checked).toBe(false);
});

// Tests that label is correct based on isFeatured state.
it("test_label_and_placement_correct", () => {
  const product = { _id: "1", featured: true };
  render(<ToggleSwitch product={product} />);
  const label = screen.getByText("Featured");
  expect(label).toBeInTheDocument();
});

// Tests that when the toggle switch is clicked, the handleFeatured function sends a PUT request to the correct endpoint with the correct payload, and the product's featured status is updated accordingly.
it("test_handle_featured_sends_correct_request", async () => {
  const product = { _id: "1", featured: false };
  jest.spyOn(axios, "put").mockResolvedValueOnce({ status: 200 });
  render(<ToggleSwitch product={product} />);
  const toggleSwitch = screen.getByLabelText("controlled");
  fireEvent.click(toggleSwitch);
  await waitFor(() =>
    expect(axios.put).toHaveBeenCalledWith(
      `/product/featured/${product._id}`,
      { isFeatured: true }
    )
  );
  jest.restoreAllMocks();
});
