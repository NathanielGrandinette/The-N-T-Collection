import React, { useState } from "react";
import "./product.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import AdminProduct from "./AdminProduct";
import UserProduct from "./UserProduct";

const Product = ({
  product,
  getProducts,
  refresh,
  setRefresh,
  user,
  toast,
  itemKey
}) => {
  const [loading, setLoading] = useState(false)


  return (
    <div className="display-card">
        <div>
          {user &&
            user.role === "admin" &&
            window.location.pathname !== "/shop" ? (
            <AdminProduct
              product={product}
              toast={toast}
              getProducts={getProducts}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          ) : (
            <UserProduct 
              product={product}
              setLoading={setLoading}
              loading={loading}
              itemKey={itemKey}
            />
          )}
        </div>
    </div>
  );
};

export default Product;
