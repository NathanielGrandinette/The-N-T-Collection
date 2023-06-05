import { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";

function useGetProducts() {
  const [products, setProducts] = useState("");

  const getProducts = async () => {
    const productList = await axios.get("/product");
    setProducts(productList.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return { products, setProducts, getProducts };
}

export default useGetProducts;
