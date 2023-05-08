const express = require('express')

const router = express.Router()

// route starts with /api
router.get('/', (req, res) => {
    res.status(200).send({ message: "/api works" })
})

module.exports = router