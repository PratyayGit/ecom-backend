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
    const { productName } = req.query;
    // const { productName } = { productName: "test1" }; // Hardcoded for testing

    const updates = req.body;
    console.log("Query Parameter", productName);
    console.log("Requested URL:", req.originalUrl);
    const updatedProduct = await Product.findOneAndUpdate(
      { productName },
      updates,
      { new: true, runValidators: true }
    );
    console.log("Update product", updatedProduct);
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
    const { productName } = req.query; // Extract the product name from the query parameter

    console.log("Query Parameter", productName); // Log the product name

    // Check if the product exists and delete it
    const deletedProduct = await Product.findOneAndDelete({ productName });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." }); // If no product found
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
    const products = await Product.find(); // Retrieve all products from the database
    res.status(200).json(products); // Send the products as a JSON response
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error." }); // Handle any errors
  }
};
module.exports = {
  createproduct,
  updateProductByName,
  getAllProducts,
  deleteProductByName,
};
