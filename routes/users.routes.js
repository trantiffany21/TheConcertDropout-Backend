const express = require('express')
const router = express.Router()

const controls = require('../controllers')

router.post('/signup', controls.users.signup)

router.post('/login', controls.users.login)

router.get('/logout', controls.users.logout)

router.get('/:username', controls.users.getUser)

router.delete('/delete', controls.users.delUser)

router.put('/addArtist', controls.users.addArtist)

router.delete('/removeArtist', controls.users.removeArtist)

router.put('/editUser', controls.users.editUser)

module.exports = router