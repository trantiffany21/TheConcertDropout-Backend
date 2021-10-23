const db = require('../models')

const bcrypt = require('bcrypt')

const signup = (req, res) => {
    console.log('signup hit')

    db.Users.findOne({ username: req.body.username }, (error, foundOne) => {
        if (foundOne) {
            res.status(406).json({ error: 'User already exists.' })
        } else {
            req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

            db.Users.create(req.body, (error, createdAccount) => {
                if (error) {
                    res.status(400).json({ error: error.message })
                } else {
                    res.status(201).json(createdAccount)
                }
            })
        }
    })
}

const login = (req, res) => {
    console.log('login hit')
    console.log(req.session)

    if (req.session.currentUser) {
        res.status(400).json({ error: 'You are still logged in.' })
    } else {
        db.Users.findOne({ username: req.body.username }, (error, foundUser) => {
            if (error) {
                res.status(200).json({ error: error.message })
            } else if (foundUser) {
                if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                    req.session.currentUser = foundUser
                    console.log(req.session)
                    res.status(202).json('Successful login.')
                } else {
                    res.status(404).json({ error: 'Invalid credentials.' })
                }
            } else {
                res.status(404).json({ error: 'Invalid credentials.' })
            }
        })
    }
}

const logout = (req, res) => {
    console.log('logout hit')

    console.log(req.session)
    if (req.session.currentUser) {
        req.session.destroy((error) => {
            if (error) {
                res.status(400).json({ error: error.message })
            }
        })
        res.status(202).json('Successful logout.')
    } else {
        res.status(404).json({ error: 'No user login found.' })
    }
}

const delUser = (req, res) => {
    console.log('delete hit')

    db.Users.findOneAndDelete({ "username": req.session.currentUser.username }, (error, deleted) => {
        if (error) {
            res.status(400).json({ error: error.message })
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