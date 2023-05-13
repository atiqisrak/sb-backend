const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  owner: { type: String },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  createdAt: { type: Date, default: Date.now },
});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
