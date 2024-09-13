const productModel = require('../../Models/productModel')
const { ApiError } = require('../../Utils/apiErrors')
const categoryModel = require('../../Models/categoryModel')

const registerProductService =async(data)=>{
    const { name, image, description, price, category, brand} =data
    const product = await productModel.findOne({name})   
    if(product){
        throw new ApiError('401', "Product Already Esxit")
    }

       // Find the category by name and get its ObjectId
   const categoryDoc = await categoryModel.findOne({ name: category });
       if (!categoryDoc) {
           throw new ApiError(400, `Category '${category}' not found`);
       }

    await productModel.create({
        name, image, description, price,brand,
         category:categoryDoc._id
    })


}

const getAllProductService =async ()=>{
    const product = await productModel.find()
    if(!product){
        throw new ApiError(400, "Product not found");
    }
    return {product}
}

const deleteProductServics = async(id)=>{
    const prod = await productModel.findByIdAndDelete(id)
    if(!prod){
        throw new ApiError(400, "Product not found");
    }
    return "Product Deleted"

}

const  updateProductService =async(id, updateData)=>{
   
    const updateProduct = await productModel.findByIdAndUpdate(id, {$set:updateData})
    if(!updateProduct){
        throw new ApiError('401', "Product not Esxit")
    }
    return true

}

const  searchProductByPriceandCompService =async(data)=>{
      const {price, brand} = data
      const filterProduct = await productModel.find({price, brand})
      if (!filterProduct || filterProduct.length === 0) {
        throw new ApiError(401, "Product is not available");
    }
      return {filterProduct}
}


module.exports = {
    registerProductService, 
    getAllProductService,
    deleteProductServics,
    updateProductService,
    searchProductByPriceandCompService
}


