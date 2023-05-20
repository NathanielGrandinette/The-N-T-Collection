import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axiosConfig";

const ProductCards = () => {
  const [products, setProducts] = useState();

  const getProducts = async () => {
    const productList = await axios.get(
      "http://localhost:3001/product"
    );
    setProducts(productList.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-row justify-between flex-wrap min-h-screen m-10">
      {products &&
        products.map((product) => {
          return (
            <div
              key={product._id}
              className="p-10 w-1/2 h-250 border-solid border-2 border-red-500"
            >
              <Link
                to={`/productdetail/${product._id}`}
                state={{ product: product }}
              >
                <h2>
                  <strong>{product.name}</strong>
                </h2>

                <div>{product.price}</div>
                <div className="mt-5">
                  <strong>Description</strong>
                  <br></br>
                  {product.description}
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default ProductCards;
