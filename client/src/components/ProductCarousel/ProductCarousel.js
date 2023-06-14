import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useGetProducts from "../../hooks/useGetProducts";
import { useNavigate } from "react-router-dom";
import "./ProductCarousel.css";

const ProductCarousel = () => {
  const { products } = useGetProducts();

  const navigate = useNavigate();

  const handleClickPhoto = (productId) => {
    navigate(`/productdetail/${productId}`);
  };

  const featuredProducts =
    products && products?.filter((product) => product.featured);

  return (
    <div>
      <Carousel autoPlay={true} infiniteLoop={true} interval={5000}>
        {products &&
          featuredProducts.map((product) => (
            <div
              className="carousel-img"
              onClick={() => handleClickPhoto(product._id)}
              key={product._id}
            >
              <img
                src={product.photo.path || product.photo}
                alt={product.name}
              />
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
