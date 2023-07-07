import { render, screen } from "@testing-library/react";
import { FileUpload } from "../components/FileUpload/FileUpload";

it("Should render a file input", () => {
  render(<FileUpload />);

  const fileLabel = screen.getByRole("textbox");

  expect(fileLabel).toBeInTheDocument();
});
