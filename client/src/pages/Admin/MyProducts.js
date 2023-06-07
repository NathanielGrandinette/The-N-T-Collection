import useGetProducts from "../../hooks/useGetProducts";
import Product from "../../components/Products/Product";
import { toast } from "react-toastify";

const MyProducts = ({ user }) => {
  const { products, getProducts } = useGetProducts();

  const myProducts =
    products &&
    products
      .filter((product) => product.productOwner?.email === user.email)
      .map((product) => (
        <Product
          key={product._id}
          product={product}
          user={user}
          getProducts={getProducts}
          toast={toast}
        />
      ));

  return myProducts.length > 0
    ? myProducts
    : "You don't have any Products listed yet.";
};

export default MyProducts;