import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContex";
import { TiDelete } from "react-icons/ti";
import { formatDate } from "../../utils/formatDate";
import useGetWishList from "../../hooks/useWishList";
import "./wishList.css";

const WishListCard = ({ product, removeProductFromWishList }) => {
  const { addProductToCart } = useCartContext();

  const { wishList } = useGetWishList();

  return (
    <div className="wish-card">
      <TiDelete
        fill={"red"}
        onClick={() => {
          removeProductFromWishList(product);
        }}
      />
      <div className="wish-image-container">
        <Link to={`/productdetail/${product._id}`}>
          <img
            src={`/${product?.photo?.path || product.photo}`} // || product.photo because of the previous structure of the old photo paths.
            className="wish-product-img"
            alt={product.name}
          />
        </Link>
      </div>
      <Link to={`/productdetail/${product._id}`}>
        <div className="mt-2 text-lg md:text-1xl  font-medium text-center">
          {product.name}
        </div>
      </Link>
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
