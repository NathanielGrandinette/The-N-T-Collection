import useGetWishList from "../../hooks/useGetWishList";
import WishListCard from "./WishListCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const navigate = useNavigate();

  const { wishList, error } = useGetWishList();

  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [error, navigate]);

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap">
      {wishList &&
        wishList.list.map((product) => (
          <div className="md:basis-1/3" key={product._id}>
            <WishListCard product={product} />
          </div>
        ))}
    </div>
  );
};

export default WishList;
