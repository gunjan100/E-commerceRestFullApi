const express = require('express')
const { registerProduct, getAllProduct, deleteProductById, updateProduct, searchProductByPriceandComp } = require('../../Controllers/Product/productController')
const upload = require('../../Middlewares/multer')
const { isUser, isAdmin } = require('../../Middlewares/authMiddleware')
const router = express.Router()


router.post('/addProduct', isUser, isAdmin, upload.single('image'), registerProduct)
router.get('/getAllProduct', getAllProduct)
router.delete('/deleteProduct/:id', deleteProductById)
router.patch('/UpadteProduct/:id', updateProduct)
router.post('/filterPro', searchProductByPriceandComp)

module.exports =router