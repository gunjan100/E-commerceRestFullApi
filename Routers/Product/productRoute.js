const express = require('express')
const { registerProduct, getAllProduct, deleteProductById } = require('../../Controllers/Product/productController')
const upload = require('../../Middlewares/multer')
const { isUser, isAdmin } = require('../../Middlewares/authMiddleware')
const router = express.Router()


router.post('/addProduct', isUser, isAdmin, upload.single('image'), registerProduct)
router.get('/getAllProduct', getAllProduct)

router.delete('/deleteProduct/:id', deleteProductById)


module.exports =router