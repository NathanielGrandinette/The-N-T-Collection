import useGetWishList from "../../hooks/useWishList";
import WishListCard from "./WishListCard";
import "../../components/Products/product.css";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./wishList.css";

const WishList = () => {
  const navigate = useNavigate();

  const { wishList, removeProductFromWishList, error } =
    useGetWishList();

  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [error, navigate]);

  return (
    <div className="flex flex-wrap">
      {wishList && wishList.list.length === 0 ? (
        <div className="noItems-container">
          <p className="noItems-para">No items in your wish list</p>
          <Link className="noItems-link" to={"/shop"}>
            View The Shop
          </Link>
        </div>
      ) : (
        wishList &&
        wishList.list.map((product) => (
          <div className=" md:basis-1/3 wish-info" key={product._id}>
            <WishListCard
              product={product}
              removeProductFromWishList={removeProductFromWishList}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default WishList;
