const express = require('express')
const app = express()
const authMidd = require('./middlewares/auth')
const cors = require('cors')

app.use(express.json())

// let alowCrossDomain = (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
//     res.header('Access-Control-Allow-Headers', '*')
//     next()
// }

const auth = require('./routes/authRoutes')
const series = require('./routes/seriesRoutes')

// app.use(alowCrossDomain)
app.use(cors())
app.use('/auth', auth)
app.use(authMidd)
app.use('/series', series)

module.exports = app