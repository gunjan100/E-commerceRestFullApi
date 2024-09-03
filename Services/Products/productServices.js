const productModel = require('../../Models/productModel')
const { ApiError } = require('../../Utils/apiErrors')
const categoryModel = require('../../Models/categoryModel')

const registerProductService =async(data)=>{
    const { name, image, description, price, category} =data
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
        name, image, description, price,
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


module.exports = {
    registerProductService, 
    getAllProductService,
    deleteProductServics
}


