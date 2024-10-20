const express = require("express");
const Product = require("../models/Product"); // Import Product model
const router = express.Router();

router.post("/createproduct", async (req, res) => {
  console.log("Request Body:", req.body); // Log request body for debugging

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
    const pp = new Product({
      productName,
      productColor,
      productDescription,
      productPrice,
      productListeigyear,
      specialFeature,
    });
    await pp.save();
    // Respond with success
    res.status(201).json({
      message: "Product created successfully.",
      pp,
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
});

module.exports = router;
