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

    savedCart && setCart(savedCart);
    console.log('1')
  };

  const getTotal = () => {
    let total = 0;
    cart?.cart &&
      cart.cart.map((product) => (total += product.price));
      console.log('2')

    return parseFloat(total.toFixed(2));
  };

  useEffect(() => {
    getCart();
    console.log('3')

  }, [cartChange]);

  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart))
    console.log('4')

  }, [cart])

  console.log(cart)
  const addProductToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      cart: [...prev.cart, product],
      totalItems: cart.cart.length + 1,
      cartTotal: getTotal(),
    }));
  };
  return { cart, addProductToCart, getCart, setCart, setCartChange };
};

export default useCart;
