const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }, 
    email: {
        type: String
    },
    performers: [{
        id: {type: Number},
        name: {type: String},
        type: {type: String}
    }]
})

const Users = mongoose.model('Users', usersSchema)

module.exports  = Users