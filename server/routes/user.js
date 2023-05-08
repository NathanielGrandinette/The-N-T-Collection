const express = require('express')

const router = express.Router()

// route starts with /user
router.get('/', (req, res, next) => {
    res.status(200).send({ message: 'user works'})
})

module.exports = router