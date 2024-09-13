const categoryModel = require("../../Models/categoryModel");
const productModel = require('../../Models/productModel')
const { ApiError } = require("../../Utils/apiErrors");
const addCategoryService = async(data)=>{
    const {name, description } = data
    const category = await categoryModel.findOne({name})
       
    if (category) {
        throw new ApiError(401, "Category already exists..");
    }

     await categoryModel.create({
        name, description
     })
}


const getAllCategoryService =async()=>{
    const Category = await categoryModel.find({})
    return Category

}


const deleteCategoryService=async(id)=>{
    const deletedUser = await categoryModel.findByIdAndDelete(id)
    if(!deletedUser){
        throw new ApiError(401, "catrogry not found")
    }
    return deletedUser  

}

const upadateCategoryService =async(id, updateData)=>{
    const updatedCategory = await categoryModel.findByIdAndUpdate(id, {$set:updateData})

    if (!updatedCategory) {
        throw new ApiError(404, "Category not found");
    }
    return updatedCategory;
}

const searchProductByCategoryService =async(data)=>{
    const {name} =data

    const category = await categoryModel.findOne({name:name})
    if(!category){
        throw new ApiError(404, "Category not found");
    }
    const filterProduct = await productModel.find({category:category._id})
    if (!filterProduct || filterProduct.length === 0) {
        throw new ApiError(404, "No products available in this category");
    }

    return {filterProduct}


}




module.exports = {
    addCategoryService, 
    getAllCategoryService,
    deleteCategoryService,
    upadateCategoryService,
    searchProductByCategoryService
    
}