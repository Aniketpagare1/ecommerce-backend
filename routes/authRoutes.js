// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// Public Routes
router.post('/register', register);
router.post('/login', login);

module.exports = router;