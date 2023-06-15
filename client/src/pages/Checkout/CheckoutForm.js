import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import { FormHelperText, Input, InputLabel, TextField } from '@mui/material'
import "./CheckoutForm.css"

const CheckoutForm = ({
    address, 
    setAddress, 
    payment, 
    setPayment
}) => {

    const handleShippingAddress = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    }

    const handlePaymentMethod = (e) => {
        setPayment({
            [e.target.name]: e.target.value
        })
    }

    console.log(address)
    return (
        <div className="checkout-form">
            <div className="checkout-form-section">
                <h2>1. Shipping Address</h2>
                <FormControl>
                    <TextField
                        required={true}
                        label="Address"
                        name="address"
                        color="secondary"
                        onChange={(e) => handleShippingAddress(e)}
                    />
                    <TextField
                        required={true}
                        label="City"
                        name="city"
                        color="secondary"
                        onChange={(e) => handleShippingAddress(e)}
                    />
                    <TextField
                        required={true}
                        label="Zip Code"
                        name="zip-code"
                        color="secondary"
                        onChange={(e) => handleShippingAddress(e)}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        label="Apt"
                        name="apt"
                        color="secondary"
                        onChange={(e) => handleShippingAddress(e)}
                    />
                    <TextField
                        required={true}
                        label="State"
                        name="sate"
                        color="secondary"
                        onChange={(e) => handleShippingAddress(e)}
                    />
                </FormControl>
            </div>
            <div className="checkout-form-section">
                <h2>2. Payment Method</h2>
                <FormControl>
                    <TextField
                        required={true}
                        type="text"
                        inputMode='numberic'
                        pattern='[0-9]*'
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        label="Card Number"
                        name="cardNum"
                        color="secondary"
                        onChange={(e) => handlePaymentMethod(e)}
                    />
                    <TextField
                        required={true}
                        label="Security Code"
                        name="cvv"
                        color="secondary"
                        onChange={(e) => handlePaymentMethod(e)}
                    />
                    <TextField
                        required={true}
                        label="Expiration Date"
                        name="exp"
                        color="secondary"
                        onChange={(e) => handlePaymentMethod(e)}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        error={payment?.name ? false : true}
                        type="text"
                        required={true}
                        label="Name on Card"
                        name="name"
                        color="secondary"
                        helperText={payment?.name ? "" : "Incorrect Entry"}
                        onChange={(e) => handlePaymentMethod(e)}
                    />
                    <TextField
                        label="Card Nickname"
                        name="nickname"
                        color="secondary"
                        onChange={(e) => handlePaymentMethod(e)}
                    />
                </FormControl>
            </div>
            <div className="checkout-form-last-section">
                <h2>3. Review Order</h2>
            </div>
        </div>
    )
}

export default CheckoutForm