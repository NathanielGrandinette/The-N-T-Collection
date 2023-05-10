import React, { useState, useEffect } from 'react'
import axios from '../../utils/axiosConfig'

const ProductList = () => {
    const [products, setProducts] = useState()

    const getProducts = async() => {
        const productList = await axios.get('http://localhost:3001/product')
        setProducts(productList.data)
    }

    useEffect(() => {
        getProducts()
    }, [])

    const deleteProduct = async(_id) => {
        console.log(_id)
        await axios.delete(`http://localhost:3001/product/${_id}`)
        getProducts()
    }

    return (
        <div>
            {products && products.map((product) => {
                return (
                    <div className="product-list-card" key={product._id}>
                        <h2><strong>{product.name}</strong></h2>
                        <div>{product.price}</div>
                        <div>{product.description}</div>
                        <button className="m-2 bg-teal-500 w-1/6">Edit</button>
                        <button className="m-2 bg-red-600 w-1/6" onClick={() => deleteProduct(product._id)}>Delete</button>
                    </div>
                )
            })}
            <button className="m-2 bg-green-600 w-1/3">Add Product</button>
        </div>
    )
}

export default ProductList