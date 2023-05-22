import React, { useState, useEffect, useContext } from "react";
import Product from "../Products/Product";
import axios from "../../utils/axiosConfig";
import "./productlist.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";

const ProductList = () => {
  const [products, setProducts] = useState();
  const [refresh, setRefresh] = useState(false);

  const { user } = useContext(AuthContext);

  const getProducts = async () => {
    const productList = await axios.get("/product");
    setProducts(productList.data);
  };

  useEffect(() => {
    getProducts();
  }, [refresh]);

  return (
    <div style={{ backgroundColor: 'bisque'}}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
      <h1>Products</h1>
      <div className="product-list-cards">
        {products &&
          products.map((product) => {
            return (
              <Product
                key={product._id}
                user={user}
                setRefresh={setRefresh}
                refresh={refresh}
                product={product}
                getProducts={getProducts}
                toast={toast}
              />
            );
          })}
      </div>
      {window.location.pathname !== "/shop" ? (
        <div className="w-full product-list-button">
          <button
            hidden={user?.role === "user"} //hide if user is not admin.
            className="bg-green-600 p-2 w-1/3 rounded"
            onClick={(e) => {
              setProducts([
                ...products,
                {
                  name: "",
                  price: "",
                  description: "",
                  quantity: "",
                },
              ]);
            }}
          >
            Add Product
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductList;
