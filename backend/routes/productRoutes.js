const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    archiveProduct
} = require('../controllers/productController');

const upload = require('../middlewares/uploadImage');

// Create product with images (multiple)
router.post('/', upload.array('images', 5), createProduct);

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', archiveProduct);

module.exports = router;
