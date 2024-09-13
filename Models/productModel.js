const { types, required } = require('joi')
const {model, Schema} = require('mongoose')
const Category = require('./categoryModel')


const productSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    brand :{
        type:String,
        required:true,
    },
    category:{
        type:Schema.Types.ObjectId,
        ref: 'Category',
        required:true,   
    }
})

const userModel = new model('product' , productSchema)

module.exports = userModel