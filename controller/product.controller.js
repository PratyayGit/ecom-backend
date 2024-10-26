const Product = require("../models/Product.model");

const createproduct = async (req, res) => {
  try {
    // Destructure fields from the request body
    const {
      productName,
      productColor,
      productDescription,
      productPrice,
      productListeigyear,
      specialFeature,
    } = req.body;

    // Validate required fields
    if (!productName || !productColor || !productDescription) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (productName.trim() === "") {
      return res.status(400).json({ message: "Product name cannot be empty." });
    }

    // Check if a product with the same name already exists
    const existingProduct = await Product.findOne({ productName });
    if (existingProduct) {
      return res
        .status(400)
        .json({ error: "Product with this name already exists." });
    }

    // Create a new product using the `create()` method
    const newProduct = new Product({
      productName,
      productColor,
      productDescription,
      productPrice,
      productListeigyear,
      specialFeature,
      userId: req.user.userId,
    });
    await newProduct.save();
    // Respond with success
    res.status(201).json({
      message: "Product created successfully.",
    });
  } catch (error) {
    // Handle duplicate key error (code 11000)
    if (error.code === 11000) {
      res.status(400).json({ error: "Duplicate product name detected." });
    } else {
      // Handle other errors
      res.status(500).json({ error: error.message || "Server error." });
    }
  }
};
const updateProductByName = async (req, res) => {
  try {
    if (product.userId.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this product." });
    }
    const { productName } = req.query;
    // const { productName } = { productName: "test1" }; // Hardcoded for testing

    const updates = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { productName },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json({
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error." });
  }
};
const deleteProductByName = async (req, res) => {
  try {
    if (product.userId.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this product." });
    }
    const { productName } = req.query;

    const deletedProduct = await Product.findOneAndDelete({ productName });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json({
      message: "Product deleted successfully.",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error." });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const username = req.user.username;
    const products = await Product.find({ userId: req.user.userId });
    res.status(200).json({
      username,
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error try again." });
  }
};

const productFilter = async (req, res) => {
  try {
    const {
      productName,
      productColor,
      productDescription,
      specialFeature,
      userId,
      minPrice,
      maxPrice,
      productListingYear,
    } = req.query;

    // Initialize filter object
    const filter = {};

    // Dynamically add filter properties if they exist in the query
    if (productName) filter.productName = productName;
    if (productColor) filter.productColor = productColor;
    if (productDescription) filter.productDescription = productDescription;
    if (specialFeature) filter.specialFeature = specialFeature;
    if (userId) filter.userId = userId;

    // Add price range filtering
    if (minPrice || maxPrice) {
      filter.productPrice = {};
      if (minPrice) filter.productPrice.$gte = Number(minPrice);
      if (maxPrice) filter.productPrice.$lte = Number(maxPrice);
    }

    // Add listing year filtering
    if (productListingYear)
      filter.productListeigyear = Number(productListingYear);

    // Fetch products based on the filter
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = {
  createproduct,
  updateProductByName,
  getAllProducts,
  deleteProductByName,
  productFilter,
};
