const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.headers['x-access-token']
    if(!token) {
        return res.status(403).send("A token is required for authentication")
    }

    try {
        const decoded = jwt.verify(token, keys.jwt.secret)
        req.user = decoded
    } catch (error) {
        return res.status(401).send("Invalid Token")
    }
    return next()
}

module.exports = verifyToken