const Product = require("../models/ProductModel");
const { StatusCodes } = require("http-status-codes");

// Create Product
const createProduct = async (req, res) => {
  try {
    const imageUrls = req.files ? req.files.map((file) => file.path) : [];
    const productData = { ...req.body, images: imageUrls };

    const product = await Product.create(productData);
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Product created", product });
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
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }
    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// Update Product (with optional new images)
const updateProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }

    let updatedImages = existingProduct.images;
    if (req.files && req.files.length > 0) {
      // Append new images to existing ones
      updatedImages = [...existingProduct.images, ...req.files.map((f) => f.path)];
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, images: updatedImages },
      { new: true }
    );

    res
      .status(StatusCodes.OK)
      .json({ message: "Product updated", product: updatedProduct });
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
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
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
  archiveProduct,
};
