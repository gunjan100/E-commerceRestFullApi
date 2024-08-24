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


module.exports = {
    addCategoryService,  getAllCategoryService
}