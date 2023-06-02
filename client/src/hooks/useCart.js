import { useState, useEffect, useMemo } from "react";

export const initialCart = {
  items: [],
  totalItems: 0,
  cartTotal: 0,
};

const useCart = () => {
  const [cart, setCart] = useState(initialCart);
  const [open, setOpen] = useState(false); //for footer

  const getCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("Cart"));

    if (savedCart && savedCart.totalItems === 0) {
      setCart(initialCart);
    } else if (savedCart) {
      setCart(savedCart);
    }
  };

  const getTotal = (cartItems) => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.shopped,
      0
    );

    return parseFloat(total.toFixed(2));
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart));
  }, [cart]);

  const addProductToCart = (product) => {
    const cartCopy = [...cart.items];
    const checkExistingItemIndex = cartCopy.findIndex(
      (item) => item._id === product._id
    );

    if (checkExistingItemIndex !== -1) {
      cartCopy[checkExistingItemIndex].shopped += 1;
    } else {
      product.shopped = 1;
      cartCopy.push(product);
    }

    setCart({
      ...cart,
      items: cartCopy,
      totalItems: cartCopy.length,
      cartTotal: getTotal(cartCopy),
    });
  };

  const removeFromCart = (id) => {
    const cartCopy = [...cart.items];
    const existingItemIndex = cartCopy.findIndex(
      (item) => item._id === id
    );

    if (existingItemIndex !== -1) {
      const existingItem = cartCopy[existingItemIndex];
      existingItem.shopped -= 1;
      if (existingItem.shopped === 0) {
        cartCopy.splice(existingItemIndex, 1); //delete item if shopped is 0
      }
    }

    setCart({
      ...cart,
      items: cartCopy,
      totalItems: cart.totalItems - 1,
      cartTotal: getTotal(cartCopy),
    });
  };
  return {
    cart,
    addProductToCart,
    getCart,
    setCart,
    removeFromCart,
    open,
    setOpen,
  };
};

export default useCart;
