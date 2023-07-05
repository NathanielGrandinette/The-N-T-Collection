import { useState, useEffect } from "react";

export const initialCart = {
  items: [],
  totalItems: 0,
  cartTotal: 0,
};

const savedCart = JSON.parse(localStorage.getItem("Cart"));

const useCart = () => {
  const [cart, setCart] = useState(
    savedCart ? savedCart : initialCart
  );
  const [toggleCart, setToggleCart] = useState(false);

  const getCart = () => {
    if (savedCart && savedCart.cartTotal <= 0) {
      setCart(initialCart);
    } else if (savedCart) {
      setCart(savedCart);
    }
  };

  const getCartTotal = (cartItems) => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.shopped,
      0
    );

    return parseFloat(total.toFixed(2));
  };

  //get total items in cart including item.shopped.
  const getTotalCartItems = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.shopped, 0);
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart));
  }, [cart]);

  const addProductToCart = (product) => {
    if(product.quantity === 0) {
      return 
    }
    const cartCopy = [...cart.items];
    const checkExistingItemIndex = cartCopy.findIndex(
      (item) => item._id === product._id
    );

    if (checkExistingItemIndex !== -1) {
      cartCopy[checkExistingItemIndex].shopped += 1;
      cart.totalItems += 1;
    } else {
      product.shopped = 1;
      cartCopy.push(product);
    }
    setCart({
      ...cart,
      items: cartCopy,
      totalItems: getTotalCartItems(cartCopy),
      cartTotal: getCartTotal(cartCopy),
    });
  };

  const removeFromCart = (product) => {
    const cartCopy = [...cart.items];
    const existingItemIndex = cartCopy.findIndex(
      (item) => item._id === product._id
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
      totalItems:
        cartCopy.length > 0 ? getTotalCartItems(cartCopy) : 0,
      cartTotal: getCartTotal(cartCopy),
    });
  };

  return {
    cart,
    addProductToCart,
    getCart,
    setCart,
    removeFromCart,
    setToggleCart,
    toggleCart,
  };
};

export default useCart;
