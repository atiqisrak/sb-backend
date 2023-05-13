const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  used: { type: Boolean },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  image: [{ type: String }],
  description: { type: Object },
  sellingPrice: { type: Number },
  offerPrice: { type: Number },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
