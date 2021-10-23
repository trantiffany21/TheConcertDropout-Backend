const express = require('express')
const session = require('express-session')

const routes = require('./routes')
require('dotenv').config()

const PORT = process.env.PORT

const app = express()

require('./config/db.connection')

app.use(session({
    secret: 'onetwothree',
    resave: false,
    saveUninitialized: false
}))

app.use(express.json())

app.use('/users', routes.users)

app.listen(PORT, () => {
    console.log(`Connected on PORT:${PORT}`)
})