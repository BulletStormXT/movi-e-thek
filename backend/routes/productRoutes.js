const express = require("express");
const router = express.Router();
const {
  createProduct,
  updateProduct,
  getProducts,
  deleteProduct,
  getProductById,
  searchProductsByName,
} = require("../controllers/productController");

// Route for creating a product
router.post("/", createProduct);

// Route for updating a product with PATCH
router.patch("/:id", updateProduct);

// Route for deleting a product
router.delete("/:id", deleteProduct);

// Route for searching products by name
router.get("/search", searchProductsByName);

// Route for getting a specific product by ID
router.get("/:id", getProductById);

// Route for listing all products
router.get("/", getProducts);

module.exports = router;
