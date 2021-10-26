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
            req.session.destroy((error) => {
                if (error) {
                    res.status(400).json({ error: error.message })
                } else {
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
                    res.status(200).json(`Artist added: ${added}`)
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

const addEvent = (req, res) => {
    console.log('add event hit')

    if (req.session.currentUser) {
        db.Users.findByIdAndUpdate(req.session.currentUser._id, {
            $push: {
                'upcomingEvents': {
                    title: req.body.title, 
                    url: req.body.url,
                    venueName: req.body.venueName,
                    city: req.body.city,
                    state: req.body.state,
                    longitude: req.body.longitude,
                    latitutude: req.body.latitutude,
                    eventId: req.body.eventId
                }
            }
        }, { safe: true, upsert: true, new: true },
            (error, added) => {
                if (error) {
                    res.status(400).json({ error: error.message })
                } else {
                    res.status(200).json(`Event added: ${added}`)
                }
            })
    } else {
        res.status(400).json('Please log in.')
    }
}

const removeEvent = (req, res) => {
    console.log('remove event hit')

    if (req.session.currentUser) {
        db.Users.findByIdAndUpdate(req.session.currentUser._id, {
            $pull: {
                'upcomingEvents': {
                    eventId: req.body.eventId
                }
            }
        }, { safe: true },
            (error, removed) => {
                if (error) {
                    res.status(400).json({ error: error.message })
                } else {
                    res.status(202).json(`Event removed: ${removed}`)
                }
            })
    } else {
        res.status(400).json('Please log in.')
    }
}


module.exports = {
    signup,
    login,
    logout,
    delUser,
    addArtist,
    removeArtist,
    addEvent,
    removeEvent
}