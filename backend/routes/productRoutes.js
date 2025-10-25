const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadImage");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  archiveProduct,
} = require("../controllers/productController");

// Create product (up to 3 images)
router.post("/", upload.array("images", 3), createProduct);

// Get products
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Update product (with optional images)
router.put("/:id", upload.array("images", 3), updateProduct);

// Archive product
router.delete("/:id", archiveProduct);

module.exports = router;
