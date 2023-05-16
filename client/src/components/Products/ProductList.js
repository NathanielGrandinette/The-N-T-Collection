import React, { useState, useEffect, useContext } from 'react'
import Product from './Product'
import axios from '../../utils/axiosConfig'
import './productlist.css'
import { AuthContext } from "../../context/AuthContext";

const ProductList = () => {
    const [products, setProducts] = useState()
    const [refresh, setRefresh] = useState(false)
    //const { user } = useContext(AuthContext);

    const getProducts = async () => {
        const productList = await axios.get('/product')
        setProducts(productList.data)
    }

    useEffect(() => {
        getProducts()
    }, [refresh])

    return (
        <div>
            <h2>Products</h2>
            <h2>Hello, {/*{user?.name}*/}</h2>
            <div className="product-list-cards">
                {products && products.map((product) => {
                    return (
                        <Product key={product._id} setRefresh={setRefresh} refresh={refresh} product={product} getProducts={getProducts} />
                    )
                })}
            </div>
            <div className="w-full product-list-button">
                <button className="bg-green-600 p-2 w-1/3 rounded" onClick={(e) => {
                    setProducts([...products, {
                        name: "",
                        price: "",
                        description: "",
                        quantity: ""
                    }])
                }}>Add Product</button>
            </div>

        </div>
    )
}

export default ProductList