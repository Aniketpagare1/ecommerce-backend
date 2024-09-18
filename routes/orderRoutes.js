// routes/orderRoutes.js
const express = require('express');
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require('../Controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Admin middleware for restricted routes
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access only' });
  }
};

// User routes
router.post('/', protect, createOrder);
router.get('/myorders', protect, getUserOrders);

// Admin routes
router.get('/', protect, admin, getAllOrders);
router.put('/:id', protect, admin, updateOrderStatus);

module.exports = router;
