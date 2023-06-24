import React, { useEffect, useState } from 'react'
import './Checkout.css'
import { useCartContext } from '../../context/CartContex';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import CheckoutForm from './CheckoutForm';
import axios from '../../utils/axiosConfig';

const Checkout = ({ setOrder }) => {
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState()
    const [payment, setPayment] = useState()
    const [error, setError] = useState()
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
    const confirmOrder = () => {
        setLoading(true)
        setTimeout(async () => {
            if (!(address || payment)) {
                setError("Required")
                setLoading(false)
                return
            }
            const newOrder = await axios.post('/order', {
                streetAddress: address.address,
                city: address.city,
                zip: address.zip,
                apt: address.apt ? address.apt : undefined,
                state: address.state,
                order: cart,
            })
            setOrder(newOrder.data)
            localStorage.removeItem("Cart")
            navigate('/orderconfirmation')
            setLoading(false)
        }, 1000)
    }

    return (
        <div className="checkout">
            <CheckoutForm
                address={address}
                setAddress={setAddress}
                payment={payment}
                setPayment={setPayment}
                error={error}
                setError={setError}
            />
            <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                {cart && cart.items?.map((item) => {
                    return (
                        <div className="checkout-item" key={item._id}>
                            <div className="checkout-item-img-name">
                                <img src={item.photo.path || item.photo}></img>
                                <h2>{item.name}</h2>
                            </div>
                            <div className="quantity-price">
                                <div>Quantity: {item.shopped}</div>
                                <div>${item.price * item.shopped}</div>
                            </div>
                        </div>
                    )
                })}
                <div style={{ height: "200px", width: '75%' }}>
                    <div className="checkout-button-total">
                        <button
                            disabled={false}
                            onClick={() => confirmOrder()}
                            className="block bg-slate-500 text-white hover:bg-slate-700 uppercase p-2 rounded">
                            {loading ? <LoadingSpinner /> : 'Confirm Order'}
                        </button>
                        <div className="checkout-total">
                            Order Total: ${total}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;
