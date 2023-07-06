import useGetProducts from "../../hooks/useGetProducts";
import Product from "../../components/Products/Product";
import { toast } from "react-toastify";

const MyProducts = ({ user }) => {
  const { products, getProducts } = useGetProducts();

  return (
    <div className="my-products">
      {products && products.filter((product) => product.productOwner?.email === user.email).map((product) => {
        return (
          <div className="my-product-card">
            {product ? 
            <Product 
              key={product._id}
              product={product}
              user={user}
              getProducts={getProducts}
              toast={toast}
            /> : "You don't have any Products listed yet."}
          </div>
        )
      })}
    </div>
  )
};

export default MyProducts;
