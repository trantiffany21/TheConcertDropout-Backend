const db = require('../models')

const bcrypt = require('bcrypt')

const signup = (req, res) => {
    console.log('signup hit')
    console.log(db.Users)
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

    db.Users.create(req.body, (error, createdAccount) => {
        if(error) {
        res.status(400).json({error: error.message})   
        } else {
            res.status(201).json(createdAccount)
        }
    })
}

const login = (req, res) => {
    console.log('login hit')

    db.Users.findOne({username: req.body.username}, (error, foundUser) => {
        if(error) {
            res.status(200).json({error: error.message})
        } else if(foundUser) {
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
                req.session.currentUser = req.foundUser
                res.status(201).json('Successful login.')
            } else {
                res.status(404).json({error: 'Invalid credentials.'})
            }
        } else {
            res.status(404).json({error: 'Invalid credentials.'})
        }
    })
}

const logout = (req, res) => {
    console.log('logout hit')
    console.log(req.session.currentUser)
    req.session.currentUser = null
    res.status(201).json('Successful logout.')
}

module.exports = {
    signup,
    login,
    logout
}