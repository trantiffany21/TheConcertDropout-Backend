const express = require('express')
const router = express.Router()

const controls = require('../controllers')

router.post('/signup', controls.users.signup)

router.post('/login', controls.users.login)

router.delete('/logout', controls.users.logout)

module.exports = router