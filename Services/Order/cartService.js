const cartModel = require("../../Models/cartModel");

const addCartItemServices = async (data, userId) => {
    const { productId, price, quantity, image, name } = data;
    let cart = await cartModel.findOne({ userId });

    if (!cart) {
           cart = await cartModel.create({
            userId,
            items: [{
                productId,
                name,
                image,
                quantity,
                price
            }]
        });
    } else {
       
        const existCartItem = cart.items.find(item => item.productId.toString() === productId);
        if (existCartItem) {
            existCartItem.quantity += quantity;
        } else {
            cart.items.push({
                productId,
                name,
                image,
                quantity,
                price
            });
        }
    }

    // Save the updated cart
    await cart.save();
    return cart; // Return the updated cart
};

module.exports = {
    addCartItemServices
};
