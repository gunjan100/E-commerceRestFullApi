const asyncHandler = require('express-async-handler')
const { createOrderServices, getAllOrderService, deleteOrderServices, getAllOrderByIdService } = require('../../Services/Order/orderServices')
const {idValidator} = require('../../Validators/commonValidator')

const createOrder =asyncHandler(async(req, res)=>{
    const data = req.body
    await createOrderServices(data)
    res.status(201).json({success:true, message:"Order Created Succesfully..."})

})

const getAllOrders = asyncHandler(async(req, res)=>{
    const {orderDetail} = await getAllOrderService()
    res.status(201).json({success:true,orderDetail})
})

const deleteOrderById= asyncHandler(async(req, res)=>{
    const {id } = req.params
        await deleteOrderServices(id)
    res.status(201).json({success:true, message:"Order Deleted Successfully"})

})

const getAllOrdersById = asyncHandler(async(req, res)=>{
    const {id} = req.params
    const {error} = await idValidator(id)
    if(error){
        res.status(401).json({success:false, message:error[0].message})
    }
    const user = await getAllOrderByIdService(id)
    res.status(201).json({success:true, orders:user.order})

})


module.exports = {
    createOrder,
    getAllOrders, 
    deleteOrderById,
    getAllOrdersById
}