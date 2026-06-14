require('dotenv').config();
const express = require('express');
const cors= require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes')
const userRoutes = require('./routes/userRoutes');
const PORT= process.env.PORT || 5000
const app = express();

app.use(cors());
app.use(express.json());



connectDB();

app.use('/api/auth',authRoutes);

app.use('/api/transactions',transactionRoutes);

app.use('/api/dashboard',dashboardRoutes);

app.use('/api/analytics',analyticsRoutes);

app.use('/api/users',userRoutes);

app.get('/',(req,res)=>{
    res.send('Expense Tracker')
})

app.listen(PORT,()=>{
    console.log(`Server connected successfully ${PORT}`);
})
