import { useLocation, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const navigate = useNavigate();
  //grab the product from
  //state passed from Product through Link
  let { state } = useLocation();

  const handleBackBtn = (e) => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col border border-teal-600 text-center">
      <h1> Product Name: {state.product.name}</h1>
      <ul className="p-2" key={state.product._id}>
        <li> Product Summary:{state.product.description}</li>
        <li> Price: ${state.product.price}</li>
        <li>In Stock:{state.product.quantity}</li>
      </ul>

      <button
        className="m-2 bg-teal-500 w-1/6 mx-auto"
        onClick={handleBackBtn}
      >
        Go Back
      </button>
    </div>
  );
};

export default ProductDetail;
