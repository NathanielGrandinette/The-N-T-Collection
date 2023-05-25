import React, { useState, useEffect } from 'react'
import { BsBag } from "react-icons/bs";
import "./footer.css"

const Footer = () => {
    const [cart, setCart] = useState()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("Cart")))
    }, [])

    return (
        <div className="footer" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            {open ?
                <div>
                    <h3 className="cart-header">
                        Cart:
                    </h3>
                    <div className="cart">
                        {cart ? cart.map((product) => {
                            return (
                                <div className="product">
                                    <img
                                        src={product.photo?.path || product.photo}
                                        className="cart-product-img"
                                        alt={product.name}
                                    />
                                </div>
                            )
                        }) : "Your cart is empty"}
                    </div>
                </div>
                :
                <div className="cart-svg">
                    <BsBag size={30}/>
                </div>
            }
        </div>
    )
}

export default Footer