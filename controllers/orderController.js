// controllers/orderController.js
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// Create an order (User only)
exports.createOrder = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const totalPrice = product.price * quantity;

    const order = await Order.create({
      user: req.user._id,
      product: productId,
      quantity,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get orders of the logged-in user (User only)
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all orders (Admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status || order.status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
