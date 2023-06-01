import { useState, useEffect, useMemo } from "react";

export const initialCart = {
  cart: [],
  totalItems: 0,
  cartTotal: 0,
};

const useCart = () => {
  const [cart, setCart] = useState(initialCart);
  const [cartChange, setCartChange] = useState(false);
  const [open, setOpen] = useState(false); //for footer

  const getCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("Cart"));
    console.log("saved cart", savedCart)
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

  console.log("Cart", cart)
  const addProductToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        cart: [...prevCart.cart, product],
        totalItems: prevCart.totalItems + 1,
        cartTotal: prevCart.cartTotal + product.price
      }
      return updatedCart
    })
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.cart.filter((item) => id !== item._id);

    setCart((prevCart) => ({
      ...prevCart,
      cart: updatedCart,
      totalItems: prevCart.totalItems - 1,
      cartTotal: getTotal(),
    }));
    setOpen((open) => !open);
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
