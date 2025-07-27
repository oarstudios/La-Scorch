const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Auth
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Users
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/', userController.getAllUsers);

// Cart
router.post('/:id/cart', userController.addToCart);
router.put('/:id/cart', userController.updateCart);
router.delete('/:id/cart/:productId', userController.removeFromCart);
router.delete('/:id/cart', userController.emptyCart);

// Address
router.post('/:id/address', userController.addAddress);
router.put('/:id/address/:addressId', userController.updateAddress);
router.delete('/:id/address/:addressId', userController.deleteAddress);

module.exports = router;
