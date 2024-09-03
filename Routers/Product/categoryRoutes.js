const express = require('express')
const { addCategory, getAllCategory, deleteCtaegory, updateCategory } = require("../../Controllers/Product/categoryController")
const {isUser, isAdmin} = require('../../Middlewares/authMiddleware')
const { createOrder, verifyPayment  } = require('../../Controllers/razorpay')

const router = express.Router()

router.post('/addcategoryitems', isUser, isAdmin, addCategory )
router.get('/getAllCategory', getAllCategory )
router.delete('/deleteAllCategory/:id', isUser, isAdmin, deleteCtaegory )
router.patch('/updateCategory/:id', isUser, isAdmin, updateCategory )
router.post('/createorder', createOrder )
router.post('/createwebHooks', verifyPayment  )

module.exports = router