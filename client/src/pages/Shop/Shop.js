import React from "react";
import ProductList from "../../components/ProductList/ProductList";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";

import "./shop.css";

const Shop = () => {
  return (
    <div className="shop">
      <ProductCarousel />
      <div className="home-products">
        <div className="product-display">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default Shop;
