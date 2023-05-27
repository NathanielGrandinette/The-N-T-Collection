import React, { useState, useEffect } from 'react'
import { TiDelete } from 'react-icons/ti'
import { BsBag } from "react-icons/bs";
import "./footer.css"

const Footer = () => {
    const [cart, setCart] = useState([])
    const [open, setOpen] = useState(true)

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("Cart")))
    }, [open])

    const getTotal = () => {
        let total = 0
        cart && cart.map((product) => {
            total += product.price
        })
        return parseFloat(total.toFixed(2))
    }

    const removeFromCart = (id) => {
        localStorage.setItem("Cart", JSON.stringify(cart.filter((product) => {
            return product._id !== id
        })))
    }

    return (
        <div className="footer" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            {open ?
                <div>
                    <h3 className="cart-header">
                        Cart:
                    </h3>
                    <div className="cart">
                        {cart.length > 0 ? cart.map((product) => {
                            return (
                                <div className="product" testId={product._id}>
                                    <TiDelete onClick={() => removeFromCart(product._id)}/>
                                    <img
                                        src={product.photo?.path || product.photo}
                                        className="cart-product-img"
                                        alt={product.name}
                                    />
                                </div>
                            )
                        }) : "Your cart is empty"}
                    </div>
                    <div className="subtotal">
                        Subtotal: ${getTotal()}
                    </div>
                </div>
                :
                <div className="cart-svg">
                    <BsBag size={30} />
                </div>
            }
        </div>
    )
}

export default Footer