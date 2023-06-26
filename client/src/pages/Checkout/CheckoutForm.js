import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import { TextField } from '@mui/material'
import "./CheckoutForm.css"
import { errorMonitor } from 'events'

const CheckoutForm = ({
    address,
    setAddress,
    payment,
    setPayment,
    error,
    setError
}) => {

    console.log(error)

    const handleShippingAddress = (e) => {
        if (e.target.value === "") {
            setError({
                ...error,
                [e.target.name]: "Required"
            })
            return
        } else {
            setError("")
        }

        if (e.target.name === 'zip') {
            const regex = /^[0-9\b]+$/
            regex.test(e.target.value) ?
                setAddress({
                    ...address,
                    [e.target.name]: e.target.value
                })
                :
                setError({
                    ...error,
                    [e.target.name]: "Invalid Zip Code"
                })
        } else {
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
        } else {
            setError("")
        }

        const regex = /^[0-9\b]+$/
        if (e.target.name === 'cardNum' || e.target.name === 'cvv') {
            regex.test(e.target.value) ?
                setPayment({
                    [e.target.name]: e.target.value
                })
                :
                setError({
                    ...error,
                    [e.target.name]: "Invalid Input"
                })
        }
        if (e.target.name === 'exp') {
            const date = new Date()
            new Date(e.target.value) < date ?
                setError({
                    ...error,
                    [e.target.name]: "Card cannot be expired"
                })
                :
                setPayment({
                    [e.target.name]: e.target.value
                })
        } else {
            setPayment({
                [e.target.name]: e.target.value
            })
        }
    }


    return (
        <div className="checkout-form">
            <div className="checkout-form-section">
                <h2 className="checkout-section-title">1. Shipping Address</h2>
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
                        inputProps={{ maxLength: 5 }}
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
                <h2 className="checkout-section-title">2. Payment Method</h2>
                <FormControl>
                    <TextField
                        error={error?.cardNum ? true : false}
                        helperText={error?.cardNum ? error.cardNum : false}
                        required={true}
                        type="text"
                        inputProps={{ maxLength: 12 }}
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
                        inputProps={{ maxLength: 4 }}
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
                <h2 className="checkout-section-title">3. Review Order</h2>
            </div>
        </div>
    )
}

export default CheckoutForm