import { screen, render } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";
// Tests that ErrorBoundary renders children when no error occurs
it("test_that_no_error_occurs", () => {
  // Test that ErrorBoundary renders children when no error occurs
  render(
    <ErrorBoundary fallback={<div>Error occurred</div>}>
      <div>No error occurred</div>
    </ErrorBoundary>
  );
  expect(screen.getByText("No error occurred")).toBeInTheDocument();
});
