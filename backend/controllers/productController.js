const Product = require('../modles/ProductModel');
const { StatusCodes } = require('http-status-codes');

// Create Product
const createProduct = async (req, res) => {
    try {
        const imageUrls = req.files.map(file => file.path);
        const productData = { ...req.body, images: imageUrls };

        const product = await Product.create(productData);
        res.status(StatusCodes.CREATED).json({ message: "Product created", product });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};
// Get All Products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ isArchived: false });
        res.status(StatusCodes.OK).json(products);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

// Get Single Product
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found" });
        }
        res.status(StatusCodes.OK).json(product);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found" });
        }
        res.status(StatusCodes.OK).json({ message: "Product updated", product });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

// Delete (Soft Delete) Product
const archiveProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { isArchived: true },
            { new: true }
        );
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found" });
        }
        res.status(StatusCodes.OK).json({ message: "Product archived", product });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    archiveProduct
};
