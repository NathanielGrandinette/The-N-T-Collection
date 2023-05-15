import React, { useState, useEffect, useContext } from "react";
import ProductDetail from "./ProductDetail";
import { Link } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import { AuthContext } from "../../context/AuthContext";

const Product = ({ product, getProducts, refresh, setRefresh }) => {
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState({});
  const { user } = useContext(AuthContext);

  const { name } = user;

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
    await axios.delete(`/product/${_id}`);
    getProducts();
  };

  const handleSave = async () => {
    if (product._id === undefined) {
      await axios.post("/product", {
        name: item.name,
        price: item.price,
        description: item.description,
        quantity: item.quantity,
      });
    } else {
      await axios.put(`/product/${product._id}`, {
        name: item.name,
        price: item.price,
        description: item.description,
        quantity: item.quantity,
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
    <div>
      <h1>Hello, {name}</h1>
      {edit ? (
        <div className="flex flex-col w-1/3">
          <label htmlFor="name">
            <strong>Name:</strong>
          </label>
          <input
            type="text"
            value={item.name}
            name="name"
            onChange={(e) => handleChange(e)}
          ></input>
          <label htmlFor="price">
            <strong>Price:</strong>
          </label>
          <input
            type="text"
            value={item.price}
            name="price"
            onChange={(e) => handleChange(e)}
          ></input>
          <label htmlFor="quantity">
            <strong>Quantity:</strong>
          </label>
          <input
            type="number"
            value={item.quantity}
            name="quantity"
            onChange={(e) => handleChange(e)}
          ></input>
          <label htmlFor="description">
            <strong>Description:</strong>
          </label>
          <input
            type="text"
            value={item.description}
            name="description"
            onChange={(e) => handleChange(e)}
          ></input>
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
      ) : (
        <div className="product-list-card" key={product._id}>
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
          <div>Description: {product.description}</div>
          <button
            className="m-2 bg-teal-500 w-1/6"
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
          <button
            className="m-2 bg-red-600 w-1/6"
            onClick={() => deleteProduct(product._id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
