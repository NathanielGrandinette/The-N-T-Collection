import { useState, useEffect, useContext } from "react";
import axios from "../utils/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function useGetWishList() {
  const [wishList, setWishList] = useState(null);

  const user = useContext(AuthContext);

  const getWishList = async () => {
    if (user) {
      try {
        const list = await axios.get("/wishlist");
        setWishList(list.data);
      } catch (error) {
        console.log(error);
        toast.error("failed to fetch wish list.");
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
      .put(`wishlist`, { product }, { baseURL: "/" })
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

  return { getWishList, wishList, setWishList, addProductToWishList };
}

export default useGetWishList;
