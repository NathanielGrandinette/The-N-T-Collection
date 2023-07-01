import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Avatar from "../components/Avatar/Avatar";

//   screen.logTestingPlaygroundURL(); to get playground

const mock = jest.fn({ name: "Test User" });

test("it has an alt test with profile image", async () => {
  render(<Avatar user={mock} />);

  const alt = screen.getByAltText("profile image");

  expect(alt).toBeInTheDocument();
});

it("renders the Avatar to guest user with default img", () => {
  render(<Avatar />);

  const avatar = screen.getByRole("img");

  expect(avatar).toHaveClass(
    "MuiAvatar-img css-1pqm26d-MuiAvatar-img"
  );
  expect(avatar).toHaveAttribute("src", "/broken-image.jpg");
});
