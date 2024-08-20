const express = require('express')
const {registerUser}  = require('../../Controllers/User/auth')
const router = express.Router()




router.post('/userRegistration', registerUser )


module.exports = router