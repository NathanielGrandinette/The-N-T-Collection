import React, { useEffect, useState } from 'react'
import './Checkout.css'
import { useCartContext } from '../../context/CartContex';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {

    const { cart, getCart } = useCartContext();

    const navigate = useNavigate()

    useEffect(() => {
        getCart(); // get cart every time the footer opens
    }, []);
    console.log(cart)
    return (
        <div>
            {cart && cart.items?.map((item) => {
                return (
                    <div className="checkout-item">
                        <div className="checkout-item-img-name">
                            <img src={item.photo}></img>
                            <div>{item.name}</div>
                        </div>
                        <div>
                            <div>Quantity: {item.shopped}</div>
                            <div>${item.price * item.shopped}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Checkout