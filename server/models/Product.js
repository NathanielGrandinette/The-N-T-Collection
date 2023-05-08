const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product