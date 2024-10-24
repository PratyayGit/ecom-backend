const express = require("express");
const router = express.Router();
const {
  createproduct,
  updateProductByName,
  getAllProducts,
} = require("../controller/product.controller");

router.post("/createproduct", createproduct);
router.put("/updateProductbyname", updateProductByName);
router.get("/getallproduct", getAllProducts);

module.exports = { productRoutes: router };
