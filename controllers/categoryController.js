const Category = require("../models/Category"); // Assuming you have a Category model

// Controller method for getting all categories
exports.getCategories = async (req, res) => {
  try {
    // Find all categories
    const categories = await Category.find();

    // Return response with the found categories data
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error in getCategories:", error);
    res.status(500).json({ error: "Server error" });
  }
};
// Controller method for getting a category by ID

exports.getCategory = async (req, res) => {
  try {
    // Extract category ID from request params
    const categoryId = req.params.id;

    // Find category by ID
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Return response with the found category data
    res.status(200).json({ category });
  } catch (error) {
    console.error("Error in getCategory:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller method for creating a new category
exports.addCategory = async (req, res) => {
  try {
    // Extract data from request body
    const { name, description } = req.body;

    // Create a new category
    const newCategory = new Category({ name, description });
    await newCategory.save();

    // Return response with the created category data
    res.status(201).json({ category: newCategory });
  } catch (error) {
    console.error("Error in addCategory:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller method for updating a category by ID
exports.updateCategory = async (req, res) => {
  try {
    // Extract category ID from request params
    const categoryId = req.params.categoryId;

    // Extract updated category data from request body
    const { name, description } = req.body;

    // Find category by ID
    const category = await Category.findById(categoryId);

    // If category not found, return error response
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Update category data
    category.name = name || category.name;
    category.description = description || category.description;
    await category.save();

    // Return response with updated category data
    res.status(200).json({ category });
  } catch (error) {
    console.error("Error in updateCategory:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller method for deleting a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    // Extract category ID from request params
    const categoryId = req.params.categoryId;

    // Find category by ID
    const category = await Category.findById(categoryId);

    // If category not found, return error response
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Delete category
    await category.remove();

    // Return success response
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    res.status(500).json({ error: "Server error" });
  }
};
