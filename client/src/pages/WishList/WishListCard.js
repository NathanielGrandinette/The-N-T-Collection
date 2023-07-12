import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContex";
import { TiDelete } from "react-icons/ti";
import { formatDate } from "../../utils/formatDate";
import Tooltip from "@mui/material/Tooltip";
import "./wishList.css";

const WishListCard = ({ product, removeProductFromWishList }) => {
  const { addProductToCart } = useCartContext();

  return (
    <div className="wish-card">
      <Tooltip
        disableFocusListener
        disableTouchListener
        title="Delete from Wishlist"
        placement="bottom-start"
      >
        <div>
          <TiDelete
            fill={"red"}
            size={25}
            onClick={() => {
              removeProductFromWishList(product);
            }}
          />
        </div>
      </Tooltip>
      <div className="wish-image-container">
        <Link to={`/productdetail/${product._id}`}>
          <img
            src={`${product?.photo?.path || product.photo}`} // || product.photo because of the previous structure of the old photo paths.
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
      <div className="text-1xl text-[#324C70] font-medium text-center">
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
      <div className="text-1xl text-[#324C70] font-medium text-center">
        Added to list: {formatDate(product.dateAdded)}
      </div>
    </div>
  );
};

export default WishListCard;
