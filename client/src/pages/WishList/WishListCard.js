import { useCartContext } from "../../context/CartContex";

const WishListCard = ({ product }) => {
  const { addProductToCart } = useCartContext();

  return (
    <div className="m-5 mt-10 mx-auto product-info border shadow-md bg-slate-200 static top-0 inset-x-0 p-2 h-64 bg-gradient-to-r from-indigo-500 transition-colors duration-200 ease-out transform origin-top-right">
      <div className="mt-4  text-1xl md:text-1xl lg:text-2xl font-heading font-medium">
        {product.productName}
      </div>
      <img
        src={`/${product?.photo?.path || product.photo}`} // || product.photo because of the previous structure of the old photo paths.
        className="object-contain h-28  translate-y-6"
        alt={product.name}
      />

      <div className="max-w-md mb-6">
        <div className="text-xs text-gray-400 tracking-wider">=</div>
      </div>
      <div className="flex flex-wrap items-center -mx-2 mb-12 gap-2 ">
        <button
          className="flex flex-wrap w-half ml-0 py-2 px-1 items-center justify-center leading-8 font-medium tracking-tighter text-sm text-center bg-green-600 focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 hover:bg-opacity-60 rounded-xl"
          onClick={() => addProductToCart(product)}
        >
          Add to cart
        </button>
        <div className="text-1xl text-blue-500 font-medium">
          Price: ${product.price}
        </div>
      </div>
    </div>
  );
};

export default WishListCard;
