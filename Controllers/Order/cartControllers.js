const asyncHandler = require('express-async-handler');
const { addCartItemServices } = require('../../Services/Order/cartService');

const addCartItem = asyncHandler(async (req, res) => {
    const data = req.body;
    const { userId } = req.params; // Ensure userId is correctly destructured
    console.log(userId);
    
    const cart = await addCartItemServices(data, userId); // Store the result from the service

    res.status(201).json({
        success: true,
        message: "Cart item added successfully.",
        cart // Return the updated cart
    });
});

module.exports = {
    addCartItem
};
