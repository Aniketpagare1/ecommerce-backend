// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');  // Add this line
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Initialize environment variables
dotenv.config();

// MongoDB connection
connectDB();  // Add this line to initialize DB connection

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);  // NEW
app.use(express.static('public'));

// Listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
