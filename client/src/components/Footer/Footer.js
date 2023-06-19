import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { Badge } from "@mui/material";
import { BsBag } from "react-icons/bs";
import { useCartContext } from "../../context/CartContex";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./footer.css";

const Footer = () => {
  const [open, setOpen] = useState(false); //for footer
  const [loading, setLoading] = useState(false);
  const { cart, getCart, removeFromCart } = useCartContext();

  const navigate = useNavigate();

  return (
    <div
      className="footer"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {open ? (
        <div className="cart-open">
          <h3 className="cart-header">Cart:</h3>
          <div className="cart">
            {cart.items?.length > 0
              ? cart.items.map((product, i) => {
                return (
                  <div
                    className="product"
                    testId={product._id}
                    key={i}
                  >
                    <TiDelete
                      onClick={() => removeFromCart(product)}
                    />
                    <Badge
                      badgeContent={
                        product.shopped > 1 ? product.shopped : null
                      }
                      color="primary"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <img
                        src={`/${product.photo.path || product.photo
                          }`}
                        className="cart-product-img"
                        alt={product.name}
                      />
                    </Badge>
                  </div>
                );
              })
              : "Your cart is empty"}
          </div>
          <button
            onClick={() => {
              if (cart.items?.length > 0) {
                navigate("/checkout", { replace: true })
              } else {
                toast.error("Your cart is empty")
              }
            }}
            className="block bg-slate-500 text-white hover:bg-slate-700 uppercase p-4 mx-auto rounded"
          >
            {loading ? <LoadingSpinner /> : "Checkout"}
          </button>
          <div className="subtotal">Subtotal: ${cart?.cartTotal}</div>
        </div>
      ) : (
        <div className="cart-svg">
          <Badge badgeContent={cart?.totalItems} color="primary">
            <BsBag size={30} />
          </Badge>
        </div>
      )}
    </div>
  );
};

export default Footer;
