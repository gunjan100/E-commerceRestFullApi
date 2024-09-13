const asyncHandler = require('express-async-handler')
const { createOrderServices } = require('../../Services/Order/orderServices')

const createOrder =asyncHandler(async(req, res)=>{
    const data = req.body
    await createOrderServices(data)
    res.status(201).json({success:true, message:"Order Created Succesfully..."})

})


module.exports = {
    createOrder

}