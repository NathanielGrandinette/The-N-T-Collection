import React from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useCartContext } from "../../context/CartContex";
import "./product.css";

const UserProduct = ({ product, setLoading, loading, itemKey }) => {
  const { addProductToCart } = useCartContext();

  return (
    <div className="m-5 product-info" key={itemKey}>
      {product.quantity === 0 ? (
        <img className="out-of-stock" src="Out-of-stock.png" />
      ) : (
        ""
      )}
      <Link
        to={`/productdetail/${product._id}`}
        state={{ product: product }}
      >
        <div className="image-container">
          <img
            src={`${product.photo?.path}` || `${product.photo}`}
            className="product-img"
            alt={product.name}
          />
        </div>
      </Link>
      <h2>
        <strong>
          Product:{" "}
          <Link
            to={`/productdetail/${product._id}`}
            state={{ product: product }}
          >
            {product.name}
          </Link>
        </strong>
      </h2>
      <div>Price: {product.price}</div>
      <div>Quantity: {product.quantity}</div>
      <div className="product-description">
        Description: {product.description}
      </div>
      <div className="w-64 mx-auto flex flex-row justify-center">
        {product.quantity === 0 ? (
          <button className="m-2 bg-red-600 w-1/2">
            Out of stock
          </button>
        ) : (
          <button
            className="m-2 bg-green-600 w-1/2 addToCart"
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                addProductToCart(product);
                setLoading(false);
              }, 500);
            }}
          >
            {loading ? <LoadingSpinner /> : "Add To Cart"}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProduct;
