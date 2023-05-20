import React, { useState, useEffect } from "react";
import ProductDetail from "./ProductDetail";
import { Link } from "react-router-dom";
import axios from "../utils/axiosConfig";
import "./product.css";

const Product = ({
  product,
  getProducts,
  refresh,
  setRefresh,
  user,
  toast
}) => {
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (product.name === "") {
      setEdit(true);
    }
    setItem(product);
  }, [product]);

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const deleteProduct = async (_id) => {
    await axios
      .delete(`/product/${_id}`)
      .then((res) => {
        console.log(res);
        toast.success("Product deleted")
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.error || err.statusText);
      });
    getProducts();
  };

  const handleSave = async () => {
    if (product._id === undefined) {
      await axios
        .post("/product", {
          name: item.name,
          price: item.price,
          description: item.description,
          quantity: item.quantity,
        })
        .then((res) => {
          console.log(res)
          toast.success("Product created")
        })
        .catch((err) => {
          console.log(err);
          setError(err.response.data.error || err.statusText);
        });
    } else {
      await axios
        .put(`/product/${product._id}`, {
          name: item.name,
          price: item.price,
          description: item.description,
          quantity: item.quantity,
        })
        .then((res) => {
          console.log(res)
          toast.success("Product updated")
        })
        .catch((err) => {
          console.log(err);
          setError(err.response.data.error || err.statusText);
        });
    }
    setRefresh(!refresh);
    setEdit(false);
  };

  const handleCancel = () => {
    setEdit(false);
    setRefresh(!refresh);
  };

  return (
    <div className="display-card">
      {user && user.role === "admin" && window.location.pathname !== "/home" ? (
        <div>
          {edit ? (
            <div className="flex flex-col m-7">
              <label htmlFor="name">
                <strong>Name:</strong>
              </label>
              <input
                type="text"
                value={item.name}
                name="name"
                className="product-input"
                onChange={(e) => handleChange(e)}
              ></input>
              <label htmlFor="price">
                <strong>Price:</strong>
              </label>
              <input
                type="text"
                value={item.price}
                name="price"
                className="product-input"
                onChange={(e) => handleChange(e)}
              ></input>
              <label htmlFor="quantity">
                <strong>Quantity:</strong>
              </label>
              <input
                type="number"
                value={item.quantity}
                name="quantity"
                className="product-input"
                onChange={(e) => handleChange(e)}
              ></input>
              <label htmlFor="description">
                <strong>Description:</strong>
              </label>
              <input
                type="text"
                value={item.description}
                name="description"
                className="product-input"
                onChange={(e) => handleChange(e)}
              ></input>
              <div className="flex flex-row justify-center">
                <button
                  className="m-2 bg-red-600 w-1/3"
                  onClick={() => handleCancel()}
                >
                  Cancel
                </button>
                <button
                  className="m-2 bg-green-500 w-1/3"
                  onClick={() => handleSave()}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="m-5 product-info" key={product._id}>
              <img src="" className="product-img"></img>
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
              <div>${product.price}</div>
              <div>Quantity: {product.quantity}</div>
              <div className="product-description">{product.description}</div>
              <div className="w-64 mx-auto flex flex-row justify-center">
                <button
                  className="m-2 bg-teal-500 w-1/3"
                  onClick={() => setEdit(true)}
                >
                  Edit
                </button>
                <button
                  className="m-2 bg-red-600 w-1/3"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
                <span className="text-red-600">
                  {error ? error : ""}
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="m-5 product-info" key={product._id}>
          <img src="" className="product-img"></img>
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
          <div className="product-description">Description: {product.description}</div>
          <div className="w-64 mx-auto flex flex-row justify-center">
            <button
              className="m-2 bg-green-600 w-1/2"
              onClick={() => setEdit(true)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
