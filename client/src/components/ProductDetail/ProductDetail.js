import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import { useCartContext } from "../../context/CartContex";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const [product, setProduct] = useState("");

  const navigate = useNavigate();
  const { productId } = useParams();

  const { addProductToCart, addProductToWishList, wishedProduct } =
    useCartContext();

  console.log(wishedProduct);

  const isProductWished = (wishedProduct) => {
    return (
      wishedProduct &&
      wishedProduct.find(
        (product) => product.product._id === productId
      )
    );
  };
  isProductWished(wishedProduct);
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
    <div
      className="m-5 mt-10 mx-auto product-info border shadow-md bg-slate-200"
      key={product.id}
    >
      <img
        src={`/${product?.photo?.path || product.photo}`} // || product.photo because of the previous structure of the old photo paths.
        className="product-img mt-2"
        alt={product.name}
      />
      <div className="mt-6 mb-4 text-5xl md:text-7xl lg:text-4xl font-heading font-medium">
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
      <div className="flex flex-wrap -mx-2 mb-12">
        <button
          className="flex flex-wrap w-half ml-0 py-4 px-2 items-center justify-center leading-8 font-heading font-medium tracking-tighter text-xl text-center bg-green-600 focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 hover:bg-opacity-60 rounded-xl"
          onClick={() => addProductToCart(product)}
        >
          Add to cart
        </button>
        <div className="w-full md:w-1/3 px-2">
          <button
            className="flex flex-wrap w-half ml-0 py-4 px-2 items-center justify-center leading-8 font-heading font-medium tracking-tighter text-xl text-center bg-white focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 hover:bg-opacity-60 rounded-xl"
            onClick={() => addProductToWishList(product)}
          >
            <span className="mr-2">Wishlist</span>
            <svg
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill={isProductWished(wishedProduct) ? "red" : "white"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3235 20.1324L2.52488 10.8515C1.75232 10.0706 1.24237 9.06367 1.06728 7.97339C0.8922 6.88311 1.06086 5.76477 1.54936 4.7768V4.7768C1.91837 4.03089 2.45739 3.3843 3.12201 2.89033C3.78663 2.39635 4.55781 2.06911 5.37203 1.93558C6.18626 1.80205 7.0202 1.86605 7.80517 2.1223C8.59013 2.37855 9.30364 2.81972 9.88691 3.40946L11.3235 4.86204L12.7601 3.40946C13.3434 2.81972 14.0569 2.37855 14.8419 2.1223C15.6269 1.86605 16.4608 1.80205 17.275 1.93558C18.0892 2.06911 18.8604 2.39635 19.525 2.89033C20.1897 3.3843 20.7287 4.03089 21.0977 4.7768V4.7768C21.5862 5.76477 21.7549 6.88311 21.5798 7.97339C21.4047 9.06367 20.8947 10.0706 20.1222 10.8515L11.3235 20.1324Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>

        <button
          className="flex flex-wrap w-half ml-0 py-4 px-2 items-center justify-center leading-8 font-heading font-medium tracking-tighter text-xl text-center bg-[#ffe4c4] focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 hover:bg-opacity-60 rounded-xl"
          onClick={handleBackBtn}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
