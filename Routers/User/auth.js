const express = require('express')
const {registerUser, userLogin}  = require('../../Controllers/User/userController')
const { isUser, isAdmin } = require('../../Middlewares/authMiddleware')
const router = express.Router()




router.post('/userRegistration',  registerUser )
router.post('/userlogin',  userLogin)

module.exports = router