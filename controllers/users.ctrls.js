const db = require('../models')

const bcrypt = require('bcrypt')

const signup = (req, res) => {
    res.send('signup')
}

const login = (req, res) => {
    res.send('login')
}

const logout = (req, res) => {
    res.send('logout')
}

module.exports = {
    signup,
    login,
    logout
}