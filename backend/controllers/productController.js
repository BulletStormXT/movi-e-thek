const Product = require("../models/productModel");

// Function to create a new product
exports.createProduct = async (req, res) => {
  const { name, price, description, image, category } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      image,
      category,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Function to update an existing product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    Object.keys(updates).forEach((key) => {
      product[key] = updates[key];
    });

    const updatedProduct = await product.save();
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Function to get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Function to get a specific product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Function to delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Function to search products by name
exports.searchProductsByName = async (req, res) => {
  const { search } = req.query;
  const regex = new RegExp(search, "i"); // Case-insensitive search

  try {
    const products = await Product.find({ name: regex });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
