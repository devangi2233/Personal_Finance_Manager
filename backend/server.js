const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express();
app.use(express.json())
app.use(cors())

const connectDB = require('./config/db');
connectDB();

const PORT = 5000

app.use('/api/auth', require('./routes/auth'));
app.use('/api/expense', require('./routes/expense'));
app.use('/api/income', require('./routes/income'));
app.use('/api/budget', require('./routes/budget'));
app.use("/api/dashboard", require('./routes/dashboard'));

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})