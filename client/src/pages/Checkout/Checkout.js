import React, { useEffect, useState } from 'react'
import './Checkout.css'
import { useCartContext } from '../../context/CartContex';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {

    const { cart, getCart } = useCartContext();

    const navigate = useNavigate()
    let total
    const getTotal = () => {
        const itemsPrices = cart.items.map((item) => {
            return item.price
        })
        total = itemsPrices.reduce((accumulator, value) => {
            return accumulator + value
        })
    }
    getTotal()
    console.log(cart)    
    return (
        <div className="checkout">
            {cart && cart.items?.map((item) => {
                return (
                    <div className="checkout-item">
                        <div className="checkout-item-img-name">
                            <img src={item.photo.path}></img>
                            <div>{item.name}</div>
                        </div>
                        <div>
                            <div>Quantity: {item.shopped}</div>
                            <div>${item.price * item.shopped}</div>
                        </div>
                    </div>
                )
            })}
            <div className="checkout-total">
                Total: ${total}
            </div>
        </div>
    )
}

export default Checkout