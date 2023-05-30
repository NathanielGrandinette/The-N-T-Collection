import { useState, useEffect } from "react";

export const initialCart = {
  cart: [],
  totalItems: 0,
  cartTotal: 0,
};

const useCart = () => {
  const [cart, setCart] = useState(initialCart);
  const [cartChange, setCartChange] = useState(false);

  const getCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("Cart"));

    savedCart ? setCart(savedCart) : setCart(initialCart);
  };

  const getTotal = () => {
    if (cart.cart.length === 0) {
      return;
    }
    let total = 0;
    cart?.cart &&
      cart.cart.map((product) => (total += product.price));
    return parseFloat(total.toFixed(2));
  };

  useEffect(() => {
    getCart();
  }, [cartChange]);

  const addProductToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      cart: [...prev.cart, product],
      totalItems: cart.cart.length + 1,
      cartTotal: getTotal(),
    }));
    localStorage.setItem("Cart", JSON.stringify(cart));
  };
  return { cart, addProductToCart, getCart, setCart, setCartChange };
};

export default useCart;
