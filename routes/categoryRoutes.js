const express = require("express");
const router = express.Router();

// Import category controller methods
const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Define routes for fetching categories, adding categories, updating categories, and deleting categories
router.get("/", getCategories);
router.post("/", addCategory);
router.put("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);

module.exports = router;
