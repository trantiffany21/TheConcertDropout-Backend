const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }, 
    performers: [{
        id: {type: Number},
        name: {type: String},
        type: {type: String}
    }],
    upcomingEvents: [{
        title: {type: String}, //event name
        url: {type: String},
        venueName: {type: String},
        performers: [{
            performerId: {type: String},
            name: {type: String},
            url: {type: String},
        }],
        city: {type: String},
        state: {type: String},
        longitude: {type: String},
        latitutude: {type: String},
    }]
})

const Users = mongoose.model('Users', usersSchema)

module.exports  = Users