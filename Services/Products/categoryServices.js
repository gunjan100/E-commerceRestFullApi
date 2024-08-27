const categoryModel = require("../../Models/categoryModel");
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




module.exports = {
    addCategoryService, 
    getAllCategoryService,
    deleteCategoryService,
    upadateCategoryService
    
}