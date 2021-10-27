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
    }],
    upcomingEvents: [{
        title: {type: String},
        url: {type: String},
        venueName: {type: String},
        city: {type: String},
        state: {type: String},
        longitude: {type: Number},
        latitutude: {type: Number},
        eventId: {type: Number}
    }]
})

const Users = mongoose.model('Users', usersSchema)

module.exports  = Users