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
        <div
          style={{
            backgroundColor: "#36454F",
            padding: "25px",
            minHeight: "90vh",
            marginBottom: "75px",
          }}
        >
          <Product
            key={product._id}
            product={product}
            user={user}
            getProducts={getProducts}
            toast={toast}
          />
        </div>

      ));

  return myProducts.length > 0
    ? myProducts
    : "You don't have any Products listed yet.";
};

export default MyProducts;
