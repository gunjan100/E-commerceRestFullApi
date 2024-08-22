const express = require('express')
const {registerUser, userLogin}  = require('../../Controllers/User/userController')
const { isUser, isAdmin } = require('../../Middlewares/authMiddleware')
const router = express.Router()




router.post('/userRegistration',isUser,  registerUser )
router.post('/userlogin', isAdmin, userLogin)

module.exports = router