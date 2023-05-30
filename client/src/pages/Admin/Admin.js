import React, { useState } from 'react'
import Users from '../../components/Users/Users'
import ProductList from '../../components/ProductList/ProductList'
import "./Admin.css"
const Admin = () => {
    const [page, setPage] = useState("products")

    return (
        <div>
            <div className="select-buttons">
                <button
                    onClick={() => setPage("products")}
                    className="admin-buttons"
                    style={{backgroundColor: page === "products" ? "#1E90FF" : ""}}
                >
                    Edit Products
                </button>
                <span className="space"> | </span>
                <button
                    onClick={() => setPage("users")}
                    className="admin-buttons"
                    style={{backgroundColor: page === "users" ? "#1E90FF" : ""}}
                >
                    Edit Users
                </button>
            </div>
            <div>
                {page === "products" ?
                    <ProductList />
                    :
                    <Users />
                }
            </div>
        </div>
    )
}

export default Admin