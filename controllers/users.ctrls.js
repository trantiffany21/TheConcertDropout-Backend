const db = require('../models')

const bcrypt = require('bcrypt')

const signup = (req, res) => {
    console.log('signup hit')

    db.Users.findOne({ username: req.body.username }, (error, foundOne) => {
        if (foundOne) {
            res.status(406).json({ error: 'User already exists.' })
        } else {
            req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

            console.log(req.body)
            db.Users.create(req.body, (error, createdAccount) => {
                if (error) {
                    res.status(400).json({ error: error.message })
                } else {
                    createdAccount.password = null
                    res.status(201).json(createdAccount)
                }
            })
        }
    })
}

const login = (req, res) => {
    console.log('login hit')

    // if (req.session.currentUser) {
    //     res.status(400).json({ error: 'You are still logged in.' })
    // } else {
    db.Users.findOne({ username: req.body.username }, (error, foundUser) => {
        if (error) {
            res.status(200).json({ error: error.message })
        } else if (foundUser) {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser
                console.log(req.session.currentUser)
                foundUser.password = null
                return res.status(202).json(foundUser)
            } else {
                res.status(404).json({ error: 'Invalid credentials.' })
            }
        } else {
            res.status(404).json({ error: 'Invalid credentials.' })
        }
    })
    //}
}

const logout = (req, res) => {
    console.log('logout hit')

    if (req.session.currentUser) {
        req.session.destroy((error) => {
            if (error) {
                res.status(400).json({ error: error.message })
            }
        })
        res.status(202).json('Successful logout.')
    } else {
        res.status(400).json({ error: 'No user login found.' })
    }
}

const getUser = (req, res) => {
    console.log('getUser hit')

    // if (req.session.currentUser) {
    console.log(req.session.currentUser)
    db.Users.find({ username: req.params.username }, (error, user) => {
        if (error) return res.status(400).json({ error: error.message });

        return res.status(200).json(user)
    })
    // } else {
    //     res.status(404).json({ error: 'No user login found.' })
    // }
}

const delUser = (req, res) => {
    console.log('delete hit')
    console.log(req.body.id)
    db.Users.findByIdAndDelete(req.body.id, (error, deleted) => {
        if (error) {
            res.status(400).json({ error: error.message })
        } else {
            req.session.destroy((error) => {
                if (error) {
                    res.status(400).json({ error: error.message })
                } else {
                    if(req.session){
                        req.session.destroy()
                    }
                    res.status(202).json(`Successfully deleted: ${deleted}`)
                }
            })
        }
    })
}

const addArtist = (req, res) => {
    console.log('add artist hit')

    if (req.session.currentUser) {
        db.Users.findByIdAndUpdate(req.session.currentUser._id, {
            $push: {
                'performers': {
                    name: req.body.name,
                    id: req.body.id,
                    type: req.body.type
                }
            }
        }, { safe: true, upsert: true, new: true },
            (error, added) => {
                if (error) {
                    res.status(400).json({ error: error.message })
                } else {
                    return res.status(200).json(added)
                }
            })
    } else {
        res.status(400).json('Please log in.')
    }
}

const removeArtist = (req, res) => {
    console.log('remove artist hit')

    if (req.session.currentUser) {
        db.Users.findByIdAndUpdate(req.session.currentUser._id, {
            $pull: {
                'performers': {
                    id: req.body.id
                }
            }
        }, { safe: true },
            (error, removed) => {
                if (error) {
                    res.status(400).json({ error: error.message })
                } else {
                    res.status(202).json(`Artist removed: ${removed}`)
                }
            })
    } else {
        res.status(400).json('Please log in.')
    }
}

const editUser = (req, res) => {
    console.log('edit account hit')

    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    db.Users.findByIdAndUpdate(req.body.id, {
        $set: { 'email': req.body.email, 'password': req.body.password, 'username': req.body.username }
    }, { new: true }, (error, updated) => {
        if (error) {
            res.status(400).json({ error: error.message })
        } else {
            req.session.destroy((error) => {
                if (error) {
                    res.status(400).json({ error: error.message })
                }
            })
            res.status(202).json(updated)
        }
    })
}

module.exports = {
    signup,
    login,
    logout,
    getUser,
    delUser,
    addArtist,
    removeArtist,
    editUser
}