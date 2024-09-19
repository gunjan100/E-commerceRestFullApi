const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    isBlocked:{
        type: Boolean,
        default:false       
    },
  
    address: {
        street: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        country: {
            type: String,
            required: true,
            trim: true,
        },
    },
    role: {
        type: String,
        enum: ["user", "admin", "Super Admin"],
        default: "user"
    },
wishList:[{
    type:mongoose.Schema.ObjectId,
    ref:'product'
}],
order:[{
    type:mongoose.Schema.ObjectId,
    ref:'Order'
}],
cart :[{
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // Assuming you have a Product model
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
}]
});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.isMatch = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
