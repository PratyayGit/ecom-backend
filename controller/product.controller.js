// controllers/productController.js
const productService = require("../service/product.service");

const createproduct = async (req, res) => {
  try {
    const newProduct = await productService.createProduct(
      req.body,
      req.user.userId
    );
    res.status(201).json({
      message: "Product created successfully.",
      product: newProduct,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProductByName = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProductByName(
      req.query.productName,
      req.body,
      req.user.userId
    );
    res.status(200).json({
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

const deleteProductByName = async (req, res) => {
  try {
    const deletedProduct = await productService.deleteProductByName(
      req.query.productName,
      req.user.userId
    );
    res.status(200).json({
      message: "Product deleted successfully.",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { user, products } = await productService.getAllProducts(
      req.user.userId
    );
    res.status(200).json({
      user,
      products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Server error, try again." });
  }
};

const productFilter = async (req, res) => {
  try {
    const filter = req.query; // Filter will be constructed based on the query
    const products = await productService.productFilter(filter);
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
