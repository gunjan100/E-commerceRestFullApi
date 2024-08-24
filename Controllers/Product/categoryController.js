const asyncHandler = require('express-async-handler');
const { addCategoryService, getAllCategoryService } = require('../../Services/Products/categoryServices');
const { categoryValidator } = require('../../Validators/productValidator');

const addCategory = asyncHandler(async (req, res) => {
    console.log("Request Body:", req.body); // Debug line
    const data = req.body;
  
    console.log("Adding Category:", data);
     await addCategoryService(data);
    res.status(200).json({ success: true, message: "Category Added Successfully.." });
});

const getAllCategory = asyncHandler(async (req, res) => {
    const categories = await getAllCategoryService();
    res.status(200).json({ success: true, categories });
});

module.exports = {
    addCategory,
    getAllCategory
};
