const orderModel = require('../../Models/orderModel')

const createOrderServices = async(data)=>{
    const {user, items, shippingAddress, paymentMethod } = data
       // Calculate total amount
       let totalAmount = 0;
       items.forEach(item => {
        const itemPrice = item.price * item.quantity;
        const shippingCost = item.shippingCost || 0; // Default to 0 if not provided
        const gstAmount = (item.gst / 100) * itemPrice; // GST as a percentage

        // Add item total (price * quantity) + shipping + GST to the total amount
        totalAmount += itemPrice + shippingCost + gstAmount;
    });


      const orderDetail =  await orderModel.create({
        user,
        orderNumber:`ORD-${Date.now()}`,
        items,
        shippingAddress,
        paymentMethod,
        totalAmount,

       })
       return {orderDetail}

}

module.exports = {
    createOrderServices
}