import { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";

function useGetProducts() {
  const [products, setProducts] = useState("");

  useEffect(() => {
    axios
      .get("/product")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return products;
}

export default useGetProducts;
