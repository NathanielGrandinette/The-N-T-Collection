import React, { useState, useContext } from "react";
import Product from "../Products/Product";
import "./productlist.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetProducts from "../../hooks/useGetProducts";
import { AuthContext } from "../../context/AuthContext";

const ProductList = () => {
  const [refresh, setRefresh] = useState(false);
  const [productSearch, setProductSearch] = useState();

  const { products, setProducts, getProducts } = useGetProducts();

  const { user } = useContext(AuthContext);

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

  return (
    <div
      style={{
        backgroundColor: "#36454F",
        padding: "25px",
        minHeight: "100vh",
        marginBottom: "75px",
      }}
    >
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
