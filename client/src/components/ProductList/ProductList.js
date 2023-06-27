import React, { useState, useContext } from "react";
import Product from "../Products/Product";
import "./productlist.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetProducts from "../../hooks/useGetProducts";
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add';
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
  console.log(window.scrollX)
  return (
    <div
      style={{
        backgroundColor: "#36454F",
        padding: "25px",
        minHeight: "100vh",
        marginBottom: "75px",
      }}
    >
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
                itemKey={product._id}
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
        <div className="add-button">
          <Fab color="primary"
            hidden={user?.role === "user"}
            onClick={(e) => {
              setProducts([
                {
                  name: "",
                  price: "",
                  description: "",
                  quantity: "",
                },
                ...products,
              ])
              window.scrollTo({
                top: 400,
                behavior: 'smooth'
              })
            }} >
            <AddIcon />
          </Fab>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductList;
