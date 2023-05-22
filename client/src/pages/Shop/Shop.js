import React from 'react'
import ProductList from '../../components/ProductList/ProductList'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import "./shop.css"

const Shop = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
      >
        <div className="carousel-img">
          <img src="air-jordan.jpg" />
        </div>
        <div className="carousel-img">
          <img src="bottega-veneta.jpg" />
        </div>
        <div className="carousel-img">
          <img src="meraki-perfume.jpg" />
        </div>
      </Carousel>
      <div className="home-products">
        <div>
          Sidebar
        </div>
        <div className="product-display">
          <ProductList />
        </div>

      </div>

    </div>
  )
}

export default Shop