import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useGetWishList from "../../hooks/useGetWishList";
import WishListCard from "./WishListCard";

const WishList = () => {
  const { wishList } = useGetWishList();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div>
      <div className=" flex flex-col justify-center text-center text-1xl md:text-1xl lg:text-2xl font-heading font-medium static top-0 inset-x-0 p-2 h-64 bg-gradient-to-r from-indigo-500 transition-colors duration-200 ease-out transform origin-top-right">
        <h2 className="flex flex-row flex-nowrap items-center my-8">
          <span
            className="flex-grow block border-t border-black"
            aria-hidden="true"
            role="presentation"
          ></span>
          <span className="flex-none block mx-4   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-black text-white">
            My Wishlist
          </span>
          <span
            className="flex-grow block border-t border-black"
            aria-hidden="true"
            role="presentation"
          ></span>
        </h2>
      </div>

      {wishList && (
        <Carousel
          responsive={responsive}
          swipeable={false}
          draggable={false}
          showDots={false}
          infinite={true}
          rewindWithAnimation={true}
        >
          {wishList &&
            wishList.list.map((product) => (
              <div key={product._id}>
                <WishListCard product={product} key={product._id} />
              </div>
            ))}
        </Carousel>
      )}
    </div>
  );
};

export default WishList;
