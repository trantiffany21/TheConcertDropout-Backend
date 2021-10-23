const express = require('express')
const router = express.Router()

const controls = require('../controllers')

router.post('/signup', controls.users.signup)

router.post('/login', controls.users.login)

router.get('/logout', controls.users.logout)

router.delete('/delete', controls.users.delUser)

module.exports = router