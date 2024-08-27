const asyncHandler = require('express-async-handler');
const { addCategoryService, getAllCategoryService, deleteCategoryService, upadateCategoryService } = require('../../Services/Products/categoryServices');
const { categoryValidator } = require('../../Validators/productValidator');

const addCategory = asyncHandler(async (req, res) => {
     const data = req.body;
     const {error} = categoryValidator(data)
     if(error){
        res.status(401).json({success:false, message:error.details[0].message})
     }
     await addCategoryService(data);
    res.status(200).json({ success: true, message: "Category Added Successfully.." });
});

const getAllCategory = asyncHandler(async (req, res) => {
    const categories = await getAllCategoryService();
    res.status(200).json({ success: true, categories });
});

const deleteCtaegory = asyncHandler(async(req, res)=>{
    const id = req.params.id
    await deleteCategoryService(id)
    res.status(201).json({success:true, massage:"Category Deleted Successfully..."})
})

const updateCategory = asyncHandler(async(req, res)=>{
    const id = req.params.id
    const updateData = req.body;
    await upadateCategoryService(id, updateData)
    res.status(200).json({succsess:true, massage:"Category Updated Successfully..."})
})

module.exports = {
    addCategory,
    getAllCategory,
    deleteCtaegory,
    updateCategory
};
