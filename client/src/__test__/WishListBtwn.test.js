import {
  render,
  screen,
 
} from "@testing-library/react";

import WishListBtn from "../components/Buttons/WishListBtn";


test("it shows a button with text Wishlist", () => {
  render(<WishListBtn />);

  const button = screen.getByRole("button");
  const text = screen.getByText(/wishlist/i);



  expect(button).toBeInTheDocument();
  expect(text).toHaveTextContent("Wishlist");
});

