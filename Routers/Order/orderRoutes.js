const express = require('express')
const { createOrder, getAllOrders, deleteOrderById, getAllOrdersById } = require('../../Controllers/Order/orderController')
const { isUser } = require('../../Middlewares/authMiddleware')
const router = express.Router()


router.post('/createOrder', isUser, createOrder)
router.get('/myOrder', isUser, getAllOrders)
router.get('/singleUserOrder/:id', getAllOrdersById)
router.delete('/deleteOrder/:id', isUser, deleteOrderById)
module.exports =router