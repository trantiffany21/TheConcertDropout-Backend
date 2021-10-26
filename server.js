const express = require('express')
const session = require('express-session')
const cors = require('cors')

const routes = require('./routes')
require('dotenv').config()

const PORT = process.env.PORT

const app = express()

require('./config/db.connection')

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: (origin, callback) => {
    if(whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

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