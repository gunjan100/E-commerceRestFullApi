const express = require('express')
const { createOrder } = require('../../Controllers/Order/orderController')
const { isUser } = require('../../Middlewares/authMiddleware')
const router = express.Router()


router.post('/createOrder', isUser, createOrder)


module.exports =router