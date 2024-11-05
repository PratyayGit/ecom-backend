// services/productService.js
const Product = require("../models/Product.model");
const User = require("../models/User.model");
const AdminModel = require("../models/Admin.model");
const createProduct = async (data, userId) => {
  const {
    productName,
    productColor,
    productDescription,
    productPrice,
    productListeigyear,
    specialFeature,
  } = data;

  // Validate required fields
  if (!productName || !productColor || !productDescription) {
    throw new Error("All fields are required.");
  }

  if (productName.trim() === "") {
    throw new Error("Product name cannot be empty.");
  }

  // Check if a product with the same name already exists
  const existingProduct = await Product.findOne({ productName });
  if (existingProduct) {
    throw new Error("Product with this name already exists.");
  }

  // Create and save the new product
  const newProduct = new Product({
    productName,
    productColor,
    productDescription,
    productPrice,
    productListeigyear,
    specialFeature,
    userId,
  });

  await newProduct.save();
  return newProduct;
};

const updateProductByName = async (productName, updates, userId) => {
  const product = await Product.findOne({ productName });

  if (product.userId.toString() !== userId) {
    throw new Error("You are not authorized to update this product.");
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { productName },
    updates,
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    throw new Error("Product not found.");
  }

  return updatedProduct;
};

const deleteProductByName = async (productName, userId) => {
  const product = await Product.findOne({ productName });

  if (product.userId.toString() !== userId) {
    throw new Error("You are not authorized to delete this product.");
  }

  const deletedProduct = await Product.findOneAndDelete({ productName });

  if (!deletedProduct) {
    throw new Error("Product not found.");
  }

  return deletedProduct;
};

const getAllProducts = async (userId) => {
  const user = await User.findById(userId).select("email");
  const products = await Product.find({ userId });
  return { user, products };
};

const productFilter = async (filter) => {
  const products = await Product.find(filter);
  return products;
};

module.exports = {
  createProduct,
  updateProductByName,
  deleteProductByName,
  getAllProducts,
  productFilter,
};
