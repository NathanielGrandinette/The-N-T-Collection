import React, { useState, useEffect } from 'react'
import Product from './Product'
import axios from '../../utils/axiosConfig'

const ProductList = () => {
    const [products, setProducts] = useState()
    const [refresh, setRefresh] = useState(false)

    const getProducts = async () => {
        const productList = await axios.get('/product')
        setProducts(productList.data)
    }

    useEffect(() => {
        getProducts()
    }, [refresh])


    return (
        <div>
            {products && products.map((product) => {
                return (
                    <div className="product-list-card" key={product._id}>
                        <Product setRefresh={setRefresh} refresh={refresh} product={product} getProducts={getProducts} />
                    </div>
                )
            })}
            <button className="m-2 bg-green-600 w-1/3" onClick={(e) => {
                setProducts([...products, {
                    name: "",
                    price: "",
                    description: "",
                    quantity: ""
                }])
            }}>Add Product</button>
        </div>
    )
}

export default ProductList