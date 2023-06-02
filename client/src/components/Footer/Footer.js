import React, { useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { Badge } from "@mui/material";
import { BsBag } from "react-icons/bs";
import { useCartContext } from "../../context/CartContex";
import "./footer.css";

const Footer = () => {
  const { cart, getCart, removeFromCart, open, setOpen } =
    useCartContext();

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
            {cart.items?.length > 0
              ? cart.items.map((product, i) => {
                  return (
                    <div
                      className="product"
                      testId={product._id}
                      key={i}
                    >
                      <TiDelete
                        onClick={() => removeFromCart(product._id)}
                      />
                      <Badge
                        badgeContent={product.shopped}
                        color="primary"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      >
                        <img
                          src={product.photo?.path || product.photo}
                          className="cart-product-img"
                          alt={product.name}
                        />
                      </Badge>
                    </div>
                  );
                })
              : "Your cart is empty"}
          </div>
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
