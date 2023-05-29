const Product = require("../models/Product"); // Assuming you have a Product model
const Shop = require("../models/Shop");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    console.error("Error in getProducts:", error);
    res.status(500).json({ error: "Server error" });
  }
};
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      categories: "643d2bb3478bf149283e701c",
    });
    

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch featured products" });
  }
};

exports.getFeaturedProductsList = async(req, res)=>{
  try{
    const products = await Product.find({"description.model": req.params.model})
    res.status(200).json(products);
  }catch(err){
    res.status(500).json(err.message);
  }
}


exports.addProduct = async (req, res) => {
  try {
    const {
      used,
      categories,
      image,
      description,
      sellingPrice,
      offerPrice,
      shop,
      views,
      createdAt,
    } = req.body;

    const foundShop = await Shop.findById(shop);

    if (!foundShop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    const newProduct = new Product({
      used,
      categories,
      image,
      description,
      sellingPrice,
      offerPrice,
      shop,
      views,
      createdAt,
    });
    await newProduct.save();

    // Add the new product to the shop's products array
    foundShop.products.push(newProduct);
    await foundShop.save();

    res.status(201).json({ product: newProduct });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.addProductsBulk = async (req, res) => {
  try {
    const productsData = req.body;
    const createdProducts = [];

    for (const productData of productsData) {
      const {
        used,
        categories,
        image,
        description,
        sellingPrice,
        offerPrice,
        shop,
        views,
        createdAt,
      } = productData;
      const newProduct = new Product({
        used,
        categories,
        image,
        description,
        sellingPrice,
        offerPrice,
        shop,
        views,
        createdAt,
      });
      await newProduct.save();
      createdProducts.push(newProduct);
    }

    res.status(201).json({ products: createdProducts });
  } catch (error) {
    console.error("Error in addProductsBulk:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params.productId;
    const updatedProductData = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.used = updatedProductData.used || product.used;
    product.categories = updatedProductData.categories || product.categories;
    product.image = updatedProductData.image || product.image;
    product.description = updatedProductData.description || product.description;
    product.sellingPrice =
      updatedProductData.sellingPrice || product.sellingPrice;
    product.offerPrice = updatedProductData.offerPrice || product.offerPrice;
    product.shop = updatedProductData.shop || product.shop;
    product.views = updatedProductData.views || product.views;
    product.createdAt = updatedProductData.createdAt || product.createdAt;

    const updatedProduct = await product.save();

    res.json({ product: updatedProduct });
  } catch (error) {
    console.error("Error in updateProduct:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params.productId;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.remove();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    res.status(500).json({ error: "Server error" });
  }
};
