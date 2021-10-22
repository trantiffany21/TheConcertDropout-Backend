const db = require('../models')

const bcrypt = require('bcrypt')

const signup = (req, res) => {
    console.log('signup hit')
    console.log(db.Users)
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

    db.Users.create(req.body, (error, createdAccount) => {
        if (error) {
            res.status(400).json({ error: error.message })
        } else {
            res.status(201).json(createdAccount)
        }
    })
}

const login = (req, res) => {
    console.log('login hit')

    db.Users.findOne({ username: req.body.username }, (error, foundUser) => {
        if (error) {
            res.status(200).json({ error: error.message })
        } else if (foundUser) {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = req.foundUser
                res.status(202).json('Successful login.')
            } else {
                res.status(404).json({ error: 'Invalid credentials.' })
            }
        } else {
            res.status(404).json({ error: 'Invalid credentials.' })
        }
    })
}

const logout = (req, res) => {
    console.log('logout hit')
    console.log(req.session)
    if (req.session.currentUser) {
        req.session.destroy = null
        res.status(202).json('Successful logout.')
    } else {
        res.status(404).json({error: 'No users login found.'})
    }
}

const delUser = (req, res) => {
    console.log('delete hit')
    db.Users.findOneAndDelete({"username": req.session.currentUser}, (error, deleted) => {
        if(error) {
            res.status(400).json({error: error.message})
        } else {
            res.status(202).json(`Successfully deleted: ${deleted}`)
        }
    })
}

module.exports = {
    signup,
    login,
    logout,
    delUser
}