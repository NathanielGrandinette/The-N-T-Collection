const express = require('express')
const Address = require('../models/Address')
const User = require('../models/User')

const router = express.Router()

// Routes start with /address

router
    .route('/')
    .get(async (req, res) => {
        const address = await Address.find()
        return res.status(200).send(address)
    })
    .post(async (req, res) => {
        const { _id, address, addressLine1, city, state, zip } = req.body

        if (!(address && city && state && zip)) {
            return res.status(422).send({ error: "Please fill out all required fields" })
        }

        try {
            const newAddress = await Address.create({
                address,
                addressLine1,
                city,
                state,
                zip
            })
            const user = await User.findByIdAndUpdate(_id, {
                address: newAddress
            })
            return res.status(200).send(user)
        } catch (error) {
            console.log(error)
            return res.status(500).send({ error: "Something went wrong" })
        }

    })

router
    .route('/:id')
    .get(async (req, res) => {
        const { id } = req.params

        const address = await Address.findById(id)
        return res.status(200).send(address)
    })
    .put(async (req, res) => {
        const { address, addressLine1, city, state, zip } = req.body
        const { id } = req.params

        try {
            const updateAddress = await Address.findByIdAndUpdate(id, {
                address,
                addressLine1,
                city,
                state,
                zip
            })
            return res.status(200).send(updateAddress)
        } catch (error) {
            console.log(error)
            return res.status(500).send({ error: "Something went wrong" })
        }

    })
    .delete(async (req, res) => {
        const { id } = req.params
        const { _id } = req.body

        if (!id) {
            return res.status(422).send({ error: "No ID provided" })
        }

        try {
            const deleteAddress = await Address.findByIdAndDelete(id)
            const updateUser = await User.findByIdAndUpdate(_id, {
                address: ''
            }
            )

            return res.status(200).send(updateUser)
        } catch (error) {
            console.log(error)
            return res.status(500).send({ error: "Something went wrong" })
        }


    })

module.exports = router