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
    performers: [{
        id: {type: Number, unique: true},
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
        eventId: {type: Number, unique: true}
    }]
})

const Users = mongoose.model('Users', usersSchema)

module.exports  = Users