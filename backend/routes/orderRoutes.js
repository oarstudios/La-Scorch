import express from 'express';
import upload from '../middleware/upload.js';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getCustomers
} from '../controllers/orderController.js';

const router = express.Router();

// Create a new order (with file upload)
router.post('/', upload.array("images", 5), createOrder);

// Get all orders
router.get('/', getOrders);

// Get a single order by ID
router.get('/:id', getOrderById);

// Update an order by ID
router.put('/:id', updateOrder);

// Delete an order by ID
router.delete('/:id', deleteOrder);

// Get customer summary
router.get('/summary/customers', getCustomers);

export default router;
