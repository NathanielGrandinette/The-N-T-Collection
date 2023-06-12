import {
  render,
  screen,
  fireEvent,
  renderHook,
} from "@testing-library/react";
import Footer from "./Footer";
import CartContext from "../../context/CartContex";
import useCart from "../../hooks/useCart";

const utils = renderHook(useCart);

// Tests that the cart updates when a user adds an item to it
it("test_user_adds_item_to_cart_and_cart_updates", () => {
  jest.mock(CartContext);
  screen.logTestingPlaygroundURL();

  const { wrapper } = render(<Footer cart={utils} />);

  console.log(wrapper);

  let footer = screen.getAllByRole();

  expect(footer).toBeInTheDocument();
});
