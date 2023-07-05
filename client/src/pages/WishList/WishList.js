import useGetWishList from "../../hooks/useGetWishList";
import WishListCard from "./WishListCard";
import "../../components/Products/product.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./wishList.css";

const WishList = () => {
  const navigate = useNavigate();

  const { wishList, error } = useGetWishList();

  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [error, navigate]);

  return (
    <div className="flex flex-wrap">
      {wishList &&
        wishList.list.map((product) => (
          <div className=" md:basis-1/3 wish-info" key={product._id}>
            <WishListCard product={product} />
          </div>
        ))}
    </div>
  );
};

export default WishList;
