const express = require("express");
const router = express.Router();
const { createproduct } = require("../controller/product.controller");
router.post("/createproduct", createproduct);

module.exports = router;
