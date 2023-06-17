import React, { useState, useContext } from "react";
import Users from "../../components/Users/Users";
import ProductList from "../../components/ProductList/ProductList";
import "./Admin.css";
import MyProducts from "./MyProducts";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../context/AuthContext";

const Admin = () => {
  const [page, setPage] = useState("products");
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="select-buttons">
        <button
          onClick={() => setPage("products")}
          className="admin-buttons"
          style={{
            backgroundColor: page === "products" ? "#1E90FF" : "",
          }}
        >
          Edit Products
        </button>
        <span className="space"> | </span>
        <button
          onClick={() => setPage("users")}
          className="admin-buttons"
          style={{
            backgroundColor: page === "users" ? "#1E90FF" : "",
          }}
        >
          Edit Users
        </button>
        <span className="space"> | </span>
        <button
          onClick={() => setPage("myProducts")}
          className="admin-buttons"
          style={{
            backgroundColor: page === "myProducts" ? "#1E90FF" : "",
          }}
        >
          My Products
        </button>
      </div>
      <div className="admin-page">
        {page === "products" ? (
          <ProductList />
        ) : page === "users" ? (
          <Users />
        ) : page === "myProducts" ? (
          <MyProducts user={user} />
        ) : null}
      </div>
    </div>
  );
};

export default Admin;
