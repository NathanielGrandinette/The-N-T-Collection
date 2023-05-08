const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const router = require('./routes')
const userRouter = require('./routes/user')
const productRouter = require('./routes/product')
const path = require('path')

const app = express()

//Need to add DB connection string in place of DBURL on line 11 and line 17
/*mongoose.connect(DBURL, {
}).catch((error) => {
    console.log(error)
})

mongoose.connection.on('connected', () => {
    console.log('Connected to database', DBURL)
})*/

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', router)
app.use('/user', userRouter)
app.use('/product', productRouter)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")))

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
    })
}

app.listen(3001, function (error) {
    if(error) {
        console.log(error)
    }
    console.log("Server listening on port", 3001)
})

module.exports = app
