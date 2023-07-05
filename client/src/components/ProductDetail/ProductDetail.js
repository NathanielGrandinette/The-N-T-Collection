import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import { useCartContext } from "../../context/CartContex";
import WishListBtn from "../Buttons/WishListBtn";
import { toast } from "react-toastify";
import useGetWishList from "../../hooks/useWishList";

const ProductDetail = () => {
  const [product, setProduct] = useState("");

  const navigate = useNavigate();
  const { productId } = useParams();

  const { addProductToCart } = useCartContext();
  const { wishList, addProductToWishList } = useGetWishList();

  useEffect(() => {
    axios
      .get(`/product/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong.");
      });
  }, [productId]);

  const handleBackBtn = (e) => {
    navigate(-1);
  };

  return (
    <div className="h-screen m-5 flex items-center justify-center">
      <div
        className="flex flex-col justify-center w-full items-center lg:w-1/2  mx-auto  border shadow-md bg-slate-200"
        key={product.id}
      >
        <img
          src={`/${product?.photo?.path || product.photo}`} // || product.photo because of the previous structure of the old photo paths.
          className="product-img mt-2"
          alt={product.name}
        />
        <div className="mt-6 mb-4 text-2xl lg:text-4xl  font-heading font-medium">
          {product.name}
        </div>
        <div className="text-2xl text-blue-500 font-medium">
          Price: ${product.price}
        </div>
        <div>{product.quantity} in stock</div>
        <div className="max-w-md mb-6">
          <div className="text-xs text-gray-400 tracking-wider">
            {product.description}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 flex-col md:flex-row -mx-2 mb-12">
          <button
            className="flex flex-wrap w-half  ml-0 py-4 px-2 items-center justify-center leading-8 font-heading font-medium tracking-tighter text-xl text-center bg-green-600 focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 hover:bg-opacity-60 rounded-xl"
            onClick={() => addProductToCart(product)}
          >
            Add to cart
          </button>

          <WishListBtn
            product={product}
            productId={productId}
            addProductToWishList={addProductToWishList}
            wishList={wishList}
          />

          <button
            className="flex flex-wrap w-half ml-0 py-4 px-2 items-center justify-center leading-8 font-heading font-medium tracking-tighter text-xl text-center bg-[#ffe4c4] focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 hover:bg-opacity-60 rounded-xl"
            onClick={handleBackBtn}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
