let express = require('express')
let app = express()
let morgan = require('morgan')
let userRoutes = require('./routes/userRoutes')

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)

// next(arg) => yo arg ma j pathayo tyo err ma auxa.

app.use((err, req, res, next) => {
    console.log('i am err handling middleware')
    err.status = err.status || 400
    res.status(err.status).json({
        error: err.message || err
     })
})

module.exports = app