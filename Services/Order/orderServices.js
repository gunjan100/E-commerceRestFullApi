const orderModel = require('../../Models/orderModel');
const userModel = require('../../Models/userModel');
const {ApiError} = require('../../Utils/apiErrors')

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

       // Now, update the user model to add the order to the `order` field
        await userModel.findByIdAndUpdate(user, {
    $push: { order: orderDetail._id } // Push the newly created order's ID into the user's `order` array
  });
    return {orderDetail}

}

const  getAllOrderService=async()=>{
    const orderDetail = await orderModel.find()
    if(!orderDetail){
        throw new ApiError(404, "Ooops No Order Available");
    }
    return {orderDetail}
}

const deleteOrderServices =async(id)=>{
    const deleteOrder = await orderModel.findByIdAndDelete({_id:id})
    if(!deleteOrder ){
        throw new ApiError(401, "order not found")
    }
    return deleteOrder 

}

const getAllOrderByIdService =async(id)=>{
      
    const user = await userModel.findById(id).populate('order')
    if(!user || user.order.length === 0){
        throw new ApiError(401, "No Order found")
    }

    return user

}

module.exports = {
    createOrderServices, 
    getAllOrderService, 
    deleteOrderServices,
    getAllOrderByIdService
}