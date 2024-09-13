const asyncHandler = require('express-async-handler')
const { registerProductService, getAllProductService, deleteProductServics, updateProductService, searchProductByPriceandCompService } = require('../../Services/Products/productServices');
const { productValidator } = require('../../Validators/productValidator');
const { idValidator } = require('../../Validators/commonValidator');

const registerProduct = asyncHandler(async(req, res)=>{
   
    const image = req.file ? req.file.filename : null;
    const data = {
        ...req.body,
        image,
    };
   
    const {error} = productValidator(data)
    if(error){
      return  res.status(401).json({success:false, message:error.details[0].message})
    }
    
    await registerProductService(data)
    res.status(200).json({success:true, massage:"Product Added Successfully.."})

})

const getAllProduct =asyncHandler(async(req, res)=>{
    const {product} = await getAllProductService()
    res.status(200).json({success:true, product})

})

const deleteProductById = asyncHandler(async(req, res)=>{
    const id  = req.params.id
    const {error} = idValidator(id)
    if(error){
        return  res.status(401).json({success:false, message:error.details[0].message})
    }
    await deleteProductServics(id)
    res.status(201).json({success:true, massage:"Product Deletd Succesfully..."})

})

const updateProduct = asyncHandler(async(req, res)=>{
    const data = req.body
    const id = req.params.id
    const {error} = idValidator(id)
    if(error){
        return  res.status(401).json({success:false, message:error.details[0].message})
    }
    await updateProductService(id, data)
    res.status(201).json({success:true, massage:"Product Updated Succesfully..."})

})

const searchProductByPriceandComp= asyncHandler(async(req, res)=>{
    const data  = req.body

   const {filterProduct} =  await searchProductByPriceandCompService(data)
    res.status(200).json({success:true, filterProduct})

})


module.exports = {
    registerProduct, 
    getAllProduct,
    deleteProductById,
    updateProduct,
    searchProductByPriceandComp
}