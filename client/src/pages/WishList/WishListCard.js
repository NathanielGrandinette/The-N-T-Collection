import { useCartContext } from "../../context/CartContex";
import { formatDate } from "../../utils/formatDate";
import "./wishList.css";

const WishListCard = ({ product }) => {
  const { addProductToCart } = useCartContext();

  console.log(product);

  return (
    <div className="wish-card">
      <div className="wish-image-container">
        <img
          src={`/${product?.photo?.path || product.photo}`} // || product.photo because of the previous structure of the old photo paths.
          className="wish-product-img"
          alt={product.name}
        />
      </div>

      <div className="mt-2 text-lg md:text-1xl  font-medium text-center">
        {product.name}
      </div>

      <div className="text-1xl text-blue-500 font-medium text-center">
        Price: ${product.price}
      </div>

      <div className="wish-product-description">
        {product.description}
      </div>
      <button
        className="m-2 mx-auto bg-green-600 w-1/2 addToCart"
        onClick={() => addProductToCart(product)}
      >
        Add to cart
      </button>
      <div className="text-1xl text-blue-500 font-medium text-center">
        Added to list: {formatDate(product.dateAdded)}
      </div>
    </div>
  );
};

export default WishListCard;
