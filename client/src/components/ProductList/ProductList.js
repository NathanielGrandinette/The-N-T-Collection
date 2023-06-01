import React, { useState, useEffect, useContext } from "react";
import Product from "../Products/Product";
import axios from "../../utils/axiosConfig";
import "./productlist.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import useCart from "../../hooks/useCart";

const ProductList = () => {
  const [products, setProducts] = useState();
  const [refresh, setRefresh] = useState(false);
  const [productSearch, setProductSearch] = useState();

  const { user } = useContext(AuthContext);

  const getProducts = async () => {
    const productList = await axios.get("/product");
    setProducts(productList.data);
  };

  const searchProduct = (e) => {
    setProductSearch(e.target.value);
    if (e.target.value.length === 0) {
      getProducts();
      return;
    }
    productSearch &&
      setProducts(
        products.filter((product) => {
          if (
            product.name
              .toLowerCase()
              .includes(productSearch.toLowerCase())
          ) {
            return product;
          }
        })
      );
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#36454F",
        padding: "25px",
        minHeight: "100vh",
        marginBottom: "75px",
      }}
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
      {window.location.pathname === "/shop" ? (
        <h1
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bolder",
            fontSize: "50px",
            padding: "25px",
          }}
        >
          Shop Products
        </h1>
      ) : (
        ""
      )}
      <div className="w-full flex justify-center">
        <input
          className="product-search"
          placeholder="Search Products"
          value={productSearch}
          onChange={(e) => searchProduct(e)}
        ></input>
      </div>

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
