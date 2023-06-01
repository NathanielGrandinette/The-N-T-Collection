import React, { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { BsBag } from "react-icons/bs";
import useCart from "../../hooks/useCart";
import "./footer.css";

const Footer = () => {
  const {
    cart,
    getCart,
    setCart,
    removeFromCart,
    open,
    setOpen,
  } = useCart();

  useEffect(() => {
    getCart(); // get cart every time the footer opens
  }, [open]);

  return (
    <div
      className="footer"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {open ? (
        <div>
          <h3 className="cart-header">Cart:</h3>
          <div className="cart">
            {cart.cart?.length > 0
              ? cart.cart.map((product) => {
                  return (
                    <div className="product" testId={product._id}>
                      <TiDelete
                        onClick={() => removeFromCart(product._id)}
                      />
                      <img
                        src={product.photo?.path || product.photo}
                        className="cart-product-img"
                        alt={product.name}
                      />
                    </div>
                  );
                })
              : "Your cart is empty"}
          </div>
          <div className="subtotal">Subtotal: ${cart?.cartTotal}</div>
        </div>
      ) : (
        <div className="cart-svg">
          <BsBag size={30} />
        </div>
      )}
    </div>
  );
};

export default Footer;
