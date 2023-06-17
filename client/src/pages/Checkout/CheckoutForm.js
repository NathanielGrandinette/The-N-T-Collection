import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import { FormHelperText, Input, InputLabel, TextField } from '@mui/material'
import "./CheckoutForm.css"

const CheckoutForm = ({
    address,
    setAddress,
    payment,
    setPayment,
    error,
    setError
}) => {

    const handleShippingAddress = (e) => {
        if (e.target.value === "") {
            setError({
                ...error,
                [e.target.name]: "Required"
            })
            return
        } else {
            setError({
                ...error,
                [e.target.name]: ""
            })
            setAddress({
                ...address,
                [e.target.name]: e.target.value
            })
        }

    }

    const handlePaymentMethod = (e) => {
        if (e.target.value === "") {
            setError({
                ...error,
                [e.target.name]: "Required"
            })
        }
        setPayment({
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="checkout-form">
            <div className="checkout-form-section">
                <h2>1. Shipping Address</h2>
                <FormControl>
                    <TextField
                        error={error?.address ? true : false}
                        required={true}
                        label="Address"
                        name="address"
                        color="secondary"
                        helperText={error?.address ? error.address : false}
                        onChange={(e) => handleShippingAddress(e)}
                    />
                    <TextField
                        error={error?.city ? true : false}
                        helperText={error?.city ? error.city : false}
                        required={true}
                        label="City"
                        name="city"
                        color="secondary"
                        onChange={(e) => handleShippingAddress(e)}
                    />
                    <TextField
                        error={error?.zip ? true : false}
                        helperText={error?.zip ? error.zip : false}
                        required={true}
                        label="Zip Code"
                        name="zip"
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
                        error={error?.state ? true : false}
                        helperText={error?.state ? error.state : false}
                        required={true}
                        label="State"
                        name="state"
                        color="secondary"
                        onChange={(e) => handleShippingAddress(e)}
                    />
                </FormControl>
            </div>
            <div className="checkout-form-section">
                <h2>2. Payment Method</h2>
                <FormControl>
                    <TextField
                        error={error?.cardNum ? true : false}
                        helperText={error?.cardNum ? error.cardNum : false}
                        required={true}
                        type="number"
                        inputMode='numeric'
                        pattern='[0-9]*'
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        label="Card Number"
                        name="cardNum"
                        color="secondary"
                        onChange={(e) => handlePaymentMethod(e)}
                    />
                    <TextField
                        error={error?.cvv ? true : false}
                        helperText={error?.cvv ? error.cvv : false}
                        required={true}
                        type='text'
                        label="Security Code"
                        name="cvv"
                        color="secondary"
                        onChange={(e) => handlePaymentMethod(e)}
                    />
                    <TextField
                        error={error?.exp ? true : false}
                        type="month"
                        helperText={error?.exp ? error.exp : false}
                        required={true}
                        label="Expiration Date"
                        name="exp"
                        color="secondary"
                        onChange={(e) => handlePaymentMethod(e)}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        error={error?.name ? true : false}
                        helperText={error?.name ? error.name : false}
                        type="text"
                        required={true}
                        label="Name on Card"
                        name="name"
                        color="secondary"
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