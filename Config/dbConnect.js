const mongoose = require('mongoose')


const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.URI)
        console.log("Server is Connecting");
    } catch (error) {
        console.log(error);
    }

}

module.exports = dbConnection