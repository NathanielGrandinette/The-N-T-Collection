const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const AuthUserSchema = new mongoose.Schema({
    userType: {
        type: String,
        default: "Auth"
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
})

const AuthUser = mongoose.model('AuthUser', AuthUserSchema)

module.exports = AuthUser