const Shop = require("../models/Shop");

// Controller method for getting all shops
exports.getShops = async (req, res) => {
  try {
    // Find all shops
    const shops = await Shop.find();

    // Return response with the found shops data
    res.status(200).json({ shops });
  } catch (error) {
    console.error("Error in getShops:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getShop = async (req, res) => {
  try {
    // Extract shop ID from request params
    const shopId = req.params.id;

    // Find shop by ID
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    // Return response with the found shop data
    res.status(200).json({ shop });
  } catch (error) {
    console.error("Error in getShop:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createShop = async (req, res) => {
  try {
    // Validate request body data against the defined schema
    const { name, location, owner, products, createdAt } = req.body;

    // Extract validated data from request body
    const newShop = new Shop({
      name,
      location,
      owner,
      products,
      createdAt,
    });

    // Check if shop with the same name already exists in the database
    const existingShop = await Shop.findOne({ name });
    if (existingShop) {
      return res
        .status(400)
        .json({ error: "Shop with the same name already exists" });
    }
    await newShop.save();
    res.status(201).json({ shop: newShop });
  } catch (error) {
    console.error("Error in createShop:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller method for updating shop information by ID
exports.updateShop = async (req, res) => {
  try {
    // Extract shop ID from request params
    const shopId = req.params.id; // Update parameter name to match route handler

    // Extract updated shop data from request body
    const { name, description, location } = req.body;

    // Find shop by ID and update the data
    const updatedShop = await Shop.findByIdAndUpdate(
      shopId,
      { name, description, location },
      { new: true }
    );

    if (!updatedShop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    // Return response with the updated shop data
    res.status(200).json({ shop: updatedShop });
  } catch (error) {
    console.error("Error in updateShop:", error);
    res.status(500).json({ error: "Server error" });
  }
};
