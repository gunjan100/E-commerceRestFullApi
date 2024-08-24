const express = require("express");
const dotenv = require('dotenv').config();
const dbConnection = require('./Config/dbConnect');
const userRouter = require('./Routers/User/auth');
const errorHandler = require('./Middlewares/errorHandler');
const cookieParser = require("cookie-parser");
const productRoute = require('./Routers/Product/categoryRoutes')

const app = express();
app.use(express.json());
app.use(cookieParser()); 

// Connect to the database
dbConnection();
// Middleware setup


app.get('/', (req, res) => {
    res.send("API is working");
});



// User routes
app.use('/api/user', userRouter);
app.use('/api/product', productRoute);
// Error handling middleware (should be the last middleware)
app.use(errorHandler);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});
