const express = require("express");
const router = express.Router();
const {
  createproduct,
  updateProductByName,
  getAllProducts,
  deleteProductByName,
} = require("../controller/product.controller");
const jwt = require("../middlewere/jwtVerify");
router.post("/createproduct", jwt, createproduct);
router.put("/updateProductbyname", jwt, updateProductByName);
router.delete("/deleteProductByName", jwt, deleteProductByName);
router.get("/getallproduct", jwt, getAllProducts);

module.exports = { productRoutes: router };
