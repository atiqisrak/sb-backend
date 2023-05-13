const express = require("express");
const router = express.Router();

// Import shop controller methods
const {
  createShop,
  getShops,
  getShop,
  updateShop,
} = require("../controllers/shopController");

router.post("/", createShop); // Route for creating a shop
router.get("/", getShops); // Route for fetching all shops
router.get("/:shopId", getShop); // Route for fetching shop information by ID
router.put("/:shopId/update", updateShop); // Route for updating shop information by ID

module.exports = router;
