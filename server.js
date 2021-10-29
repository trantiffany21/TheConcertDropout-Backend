const express = require('express')
const session = require('express-session')
const cors = require('cors')

const routes = require('./routes')
require('dotenv').config()

const PORT = process.env.PORT

const app = express()

const MongoDBStore = require('connect-mongodb-session')(session)

require('./config/db.connection')

const whitelist = ["http://localhost:3000", process.env.WHITELIST]
const corsOptions = {
  origin: (origin, callback) => {
    if(whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('not allowed by CORS'))
    }
  },
  credentials:true
}

app.use(cors(corsOptions))

app.set('trust proxy', 1)

app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
   saveUninitialized: false,
   store: new MongoDBStore({
   	uri: process.env.MONGODB_URI,
   	collection: 'mySessions'
   }),
   cookie:{
   	sameSite: 'none',
   	secure: true
   }
}))

//before deployment for local
// app.use(session({
//     secret: 'onetwothree',
//     resave: false,
//     saveUninitialized: false
// }))
app.use(express.json())

app.use('/users', routes.users)

app.listen(PORT, () => {
    console.log(`Connected on PORT:${PORT}`)
})