import React, { useState, useContext, useMemo } from "react";
import Product from "../Products/Product";
import "./productlist.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetProducts from "../../hooks/useGetProducts";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { AuthContext } from "../../context/AuthContext";
import Select from "../Select";
const ProductList = () => {
  const [refresh, setRefresh] = useState(false);
  const [productSearch, setProductSearch] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");

  const { products, setProducts, getProducts } = useGetProducts();

  const { user } = useContext(AuthContext);

  const searchProduct = (e) => {
    setProductSearch(e.target.value.toLowerCase());

    const results =
      products &&
      products.filter((product) => {
        const nameMatch = product.name
          .toLowerCase()
          .includes(productSearch);

        return nameMatch;
      });

    setProducts([...results]);

    if (e.target.value.length === 0) {
      getProducts();
      return;
    }
  };

  const filteredProducts = useMemo(() => {
    let filteredData = products;

    if (selectedCategory === "") {
      return products;
    } else if (selectedCategory !== "") {
      filteredData = filteredData.filter(
        (product) => product.category === selectedCategory
      );
    }

    return filteredData;
  }, [products, productSearch, selectedCategory]);

  return (
    <div
      style={{
        backgroundColor: "#36454F",
        padding: "25px",
        minHeight: "100vh",
        marginBottom: "75px",
      }}
    >
      <div className="flex justify-center">
        <input
          className="md:m-0 product-search"
          placeholder="Search Products"
          value={productSearch}
          onChange={(e) => searchProduct(e)}
        ></input>
        <div>
          <Select setSelectedCategory={setSelectedCategory} />
        </div>
      </div>

      <div className="product-list-cards">
        {products && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
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
          })
        ) : (
          <div className="flex justify-center items-center h-24">
            <p className="text-gray-500">No results found.</p>
          </div>
        )}
      </div>
      {window.location.pathname !== "/shop" ? (
        <div className="add-button">
          <Fab
            color="primary"
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
              ]);
              window.scrollTo({
                top: 400,
                behavior: "smooth",
              });
            }}
          >
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
