const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const OrderSchema = new mongoose.Schema({
    address: {
        streetAddress: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
        apt: {
            type: String,
        },
        state: {
            type: String,
            required: true
        }
    },
    order: {
        cartTotal: {
            type: Number,
            required: true
        },
        items: {
            type: Array,
            required: true
        },
        totalItems: {
            type: Number,
            required: true
        }
    },
    orderOwner: {
        type: ObjectId,
        ref: "User",
        required: true,
      },
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order