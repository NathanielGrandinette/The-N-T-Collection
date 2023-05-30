import React, { useState } from "react";
import useCart, { initialCart } from "./useCart";
import { renderHook } from "@testing-library/react";

// Tests that addProductToCart function adds a product to the cart and updates totalItems and cartTotal.
it("test_add_product_to_cart", () => {
  const product = { name: "Test Product", price: 10 };
  const count = 2;
  const mockSetCart = jest.fn();
  const mockUseState = jest.spyOn(React, "useState");
  mockUseState.mockImplementation((initialValue) => [
    initialValue,
    mockSetCart,
  ]);

  const { addProductToCart } = useCart();
  addProductToCart(product, count);

  expect(mockSetCart).toHaveBeenCalledWith({
    cart: [{ name: "Test Product", price: 10, count: 2 }],
    totalItems: 2,
    cartTotal: 20,
  });
});
