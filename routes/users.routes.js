const express = require('express')
const router = express.Router()

const controls = require('../controllers')

router.get('/signup', controls.users.signup)

router.get('/login', controls.users.login)

router.get('/logout', controls.users.logout)

module.exports = router