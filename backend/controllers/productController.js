const Product = require("../models/ProductModel");
const { StatusCodes } = require("http-status-codes");

// Create Product
// const createProduct = async (req, res) => {
//   try {
//     const imageUrls = req.files ? req.files.map((file) => "/uploads/" + file.filename) : [];

//     // parse sizes
//     const sizes = [];
//     for (let key in req.body) {
//       if (key.startsWith("sizes[")) {
//         const match = key.match(/sizes\[(\d+)\]\[(\w+)\]/);
//         if (match) {
//           const index = parseInt(match[1]);
//           const field = match[2];
//           if (!sizes[index]) sizes[index] = {};
//           sizes[index][field] = field === "price" ? Number(req.body[key]) : req.body[key];
//         }
//       }
//     }

//     const productData = {
//       name: req.body.name,
//       flavour: req.body.flavor || req.body.flavour,
//       description: req.body.description,
//       category: req.body.category,
//       preparationTime: req.body.prepTime,
//       care: req.body.storage,
//       type: req.body.type,
//       sizes,
//       images: imageUrls,
//     };

//     const product = await Product.create(productData);
//     res.status(StatusCodes.CREATED).json({ message: "Product created", product });
//   } catch (error) {
//     console.error(error);
//     res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
//   }
// };

const createProduct = async (req, res) => {
  try {
    const imageUrls = req.files ? req.files.map((file) => "/uploads/" + file.filename) : [];

    // Parse sizes from JSON string
    const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];

    const productData = {
      name: req.body.name,
      flavour: req.body.flavor || req.body.flavour,
      description: req.body.description,
      category: req.body.category,
      preparationTime: req.body.prepTime,
      care: req.body.storage,
      type: req.body.type,
      size: sizes,
      images: imageUrls,
    };

    const product = await Product.create(productData);
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
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
    if (!product) return res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found" });
    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found" });
    }

    const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : product.size;
    const existingImages = req.body.existingImages
      ? JSON.parse(req.body.existingImages)
      : product.images;
    const newImages = req.files?.map(f => "/uploads/" + f.filename) || [];
    const finalImages = [...existingImages, ...newImages];

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name: req.body.name,
        flavour: req.body.flavor || product.flavour,
        description: req.body.description,
        category: req.body.category,
        preparationTime: req.body.prepTime,
        care: req.body.storage,
        type: req.body.type,
        size: sizes,
        images: finalImages,
        bestseller: req.body.bestseller === "true", // <-- add bestseller update here
      },
      { new: true }
    );

    res.status(StatusCodes.OK).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};




// Archive Product
const archiveProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isArchived: true }, { new: true });
    if (!product) return res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found" });
    res.status(StatusCodes.OK).json({ message: "Product archived", product });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Validate categoryId if needed (e.g. mongoose.Types.ObjectId.isValid(categoryId))
    const products = await Product.find({ category: categoryId, isArchived: false });

    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getBestsellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ bestseller: true, isArchived: false });
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};


module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  archiveProduct,
  getProductsByCategory,
  getBestsellerProducts
};
