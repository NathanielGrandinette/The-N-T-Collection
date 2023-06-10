import { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";
import { toast } from "react-toastify";

export const initialCart = {
  items: [],
  totalItems: 0,
  cartTotal: 0,
};

const useCart = () => {
  const [cart, setCart] = useState(initialCart);
  const [wishedProduct, setWishedProduct] = useState("");

  const getCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("Cart"));

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

  const addProductToWishList = async (product) => {
    await axios
      .put(`wishlist`, { product }, { baseURL: "/" })
      .then((res) => {
        console.log(res.data);
        setWishedProduct(res.data);
        toast.success(
          `${
            res.data[res.data.length - 1].product.name //only toast the last item in the wish list array which would be the most recent.
          } added to wishlist!`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return {
    cart,
    addProductToCart,
    getCart,
    setCart,
    removeFromCart,
    addProductToWishList,
    wishedProduct,
  };
};

export default useCart;
