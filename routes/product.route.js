const express = require("express");
const router = express.Router();
const {
  createproduct,
  updateProductByName,
  getAllProducts,
  deleteProductByName,
} = require("../controller/product.controller");

router.post("/createproduct", createproduct);
router.put("/updateProductbyname", updateProductByName);
router.delete("/deleteProductByName", deleteProductByName);
router.get("/getallproduct", getAllProducts);

module.exports = { productRoutes: router };
