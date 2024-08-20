const express = require("express");
const dotenv = require('dotenv').config();
const dbConnection = require('./Config/dbConnect');
const userRouter = require('./Routers/User/auth');
const errorHandler = require('./Middlewares/errorHandler');
const cookieParser = require("cookie-parser");

const app = express();

// Connect to the database
dbConnection();

app.get('/', (req, res) => {
    res.send("API is working");
});

// Middleware setup
app.use(express.json());
app.use(cookieParser()); // Correct spelling: cookieParser

// User routes
app.use('/api/user', userRouter);

// Error handling middleware (should be the last middleware)
app.use(errorHandler);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});
