const express = require("express");
const router = express.Router();

// Import product controller methods
const {
  getProducts,
  addProduct,
  addProductsBulk, // Update method name for bulk addition
  updateProduct,
  deleteProduct,
  getFeaturedProducts, getFeaturedProductsList
} = require("../controllers/productController");

// Define routes for fetching products, adding products, updating products, and deleting products
router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.post("/", addProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);
router.get("/featured/:model", getFeaturedProductsList);
// Define route for adding multiple products in bulk
router.post("/bulk", addProductsBulk); // Update route for bulk addition

module.exports = router;
