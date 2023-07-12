import { useState, useEffect, useContext } from "react";
import axios from "../utils/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function useWishList() {
  const [wishList, setWishList] = useState(null);

  const user = useContext(AuthContext);

  const getWishList = async () => {
    if (user) {
      try {
        const list = await axios.get("/wishlist");
        setWishList(list.data);
      } catch (error) {
        console.log(error);
        console.error("From useWishList: Error with user token.");
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    getWishList();
  }, []);

  const addProductToWishList = async (product) => {
    await axios
      .put(`/wishlist`, { product })
      .then((res) => {
        if (res.data) {
          setWishList(res.data);
        }

        toast.success(
          `${
            product.name //only toast the last item in the wish list array which would be the most recent.
          } added to wishlist!`
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response.data.error || "Something went wrong.."
        );
      });
  };

  const removeProductFromWishList = async (product) => {
    await axios
      .put(`/wishlist`, { product })
      .then((res) => {
        console.log(res);
        if (res.data) {
          setWishList(res.data);
        }

        toast.success(
          `${
            product.name //only toast the last item in the wish list array which would be the most recent.
          } removed from wishlist.`
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response.data.error || "Something went wrong.."
        );
      });
  };

  return {
    getWishList,
    wishList,
    setWishList,
    addProductToWishList,
    removeProductFromWishList,
  };
}

export default useWishList;
