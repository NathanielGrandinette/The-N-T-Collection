import React from 'react'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { useCartContext } from "../../context/CartContex";

const UserProduct = ({
    product,
    setLoading,
    loading
}) => {
    const { addProductToCart } = useCartContext();
    
    return (
        <div className="m-5 product-info" key={product._id}>
            <img
                src={product.photo?.path || product.photo}
                className="product-img"
                alt={product.name}
            />
            <h2>
                <strong>
                    Product:{" "}
                    <Link
                        to={`/productdetail/${product._id}`}
                        state={{ product: product }}
                    >
                        {product.name}
                    </Link>
                </strong>
            </h2>
            <div>Price: {product.price}</div>
            <div>Quantity: {product.quantity}</div>
            <div className="product-description">
                Description: {product.description}
            </div>
            <div className="w-64 mx-auto flex flex-row justify-center">
                <button
                    className="m-2 bg-green-600 w-1/2 addToCart"
                    onClick={() => {
                        setLoading(true)
                        setTimeout(() => {
                            addProductToCart(product)
                            setLoading(false)
                        }, 500)
                    }}
                >
                    {loading ? <LoadingSpinner /> : 'Add To Cart'}
                </button>
            </div>
        </div>
    )
}

export default UserProduct