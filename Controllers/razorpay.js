const Razorpay = require('razorpay');
const crypto = require('crypto');




const instance = new Razorpay({
    key_id: process.env.YOUR_KEY_ID,
    key_secret: process.env.YOUR_KEY_SECRET,
})

const createOrder =async (req, res)=>{
    const {amount} = req.body

   const orderDetails = await instance.orders.create({
    "amount": amount*100,
    "currency": "INR",
    "receipt": `receipt#${Date.now()}`
    })
    res.status(201).json({data:orderDetails})

}

const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generated_signature = crypto
        .createHmac('sha256', process.env.YOUR_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');
        console.log(generated_signature);

    if (generated_signature === razorpay_signature) {
        // Payment is verified
        res.status(200).json({ message: "Payment verified successfully" });
    } else {
        // Payment verification failed
        res.status(400).json({ message: "Payment verification failed" });
    }
};




module.exports ={
    createOrder,
    verifyPayment 
}