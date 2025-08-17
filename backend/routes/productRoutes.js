const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  archiveProduct,
} = require("../controllers/productController");

const upload = require("../middlewares/uploadImage");

// Create product with multiple images/videos (up to 5 files)
router.post("/", upload.array("images", 3), createProduct);

// Get products
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Update product (with new images/videos if provided)
router.put("/:id", upload.array("images", 5), updateProduct);

// Archive product
router.delete("/:id", archiveProduct);

module.exports = router;
