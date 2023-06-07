import { useState, useEffect, useMemo } from "react";

export const initialCart = {
  cart: [],
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

  const getTotal = () => {
    let total = 0;
    cart?.cart &&
      cart.cart.forEach((product) => (total += product.price)); //I was using .map before but I think this is more efficient because map creates a new array.

    return parseFloat(total.toFixed(2));
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart));
    console.log("4");
  }, [cart]);

  const addProductToCart = (product) => {
    const newProduct = {
      ...product,
      numItems: 1
    }
    console.log(cart.cart);
    setCart({
      ...cart,
      cart: [...cart?.cart, newProduct],
      totalItems: cart.cart.length + 1,
      cartTotal: cart.cartTotal += product.price,
    });
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.cart.filter((item) => product._id !== item._id);

    setCart({
      ...cart,
      cart: updatedCart,
      totalItems: updatedCart.length,
      cartTotal: cart.cartTotal - product.price,
    });
    localStorage.setItem("Cart", JSON.stringify(cart));
    // setOpen((open) => !open); when I commented this out, the delete seemed to work
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
