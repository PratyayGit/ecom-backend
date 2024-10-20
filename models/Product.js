const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productName: { type: String, unique: true, sparse: true },
  productColor: { type: String },
  productDescription: { type: String },
  productPrice: { type: Number },
  productListeigyear: { type: Number },
  specialFeature: { type: String },
});
module.exports = mongoose.model("Product", productSchema);
