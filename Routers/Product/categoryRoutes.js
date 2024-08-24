const express = require('express')
const { addCategory, getAllCategory } = require("../../Controllers/Product/categoryController")
const {isUser, isAdmin} = require('../../Middlewares/authMiddleware')

const router = express.Router()

router.post('/addcategoryitems', isUser, isAdmin, addCategory )
router.get('/getAllCategory', getAllCategory )


module.exports = router