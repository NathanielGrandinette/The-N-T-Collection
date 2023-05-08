const mongoose = require('mongoose')


const addressSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    addressLine1: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true
    }
})

const Address = mongoose.model('Address', addressSchema)

module.exports = Address