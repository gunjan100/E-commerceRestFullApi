const express = require('express')
const { addCartItem } = require('../../Controllers/Order/cartControllers')
const {isUser} = require('../../Middlewares/authMiddleware')

const router = express.Router()


router.post('/addCart/:userId', isUser, addCartItem)

module.exports =router