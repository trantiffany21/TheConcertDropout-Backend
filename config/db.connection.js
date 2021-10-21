const mongoose = require('mongoose')

const connectionStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/concert'

mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log(`MongoDB Connected`)
})

mongoose.connection.on('eror', (error) => {
    console.log(`MongoDB Error: ${error}`)
})

mongoose.connection.on('disconnected', () => {
    console.log(`MongoDB Disconnected`)
})