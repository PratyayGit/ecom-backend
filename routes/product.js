const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         productname:
 *           type: string
 *           description: The name of the product
 *         productcolor:
 *           type: string
 *           description: The color of the product
 *         productdescription:
 *           type: string
 *           description: A description of the product
 *       required:
 *         - productname
 *         - productcolor
 *         - productdescription
 */

/**
 * @swagger
 * /api/product/createproduct:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Server error
 */
router.post("/createproduct", async (req, res) => {
  try {
    const { productname, productcolor, productdescription } = req.body;

    // Basic validation
    if (!productname || !productcolor || !productdescription) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const product = new Product({
      productname,
      productcolor,
      productdescription,
    });

    await product.save();

    res.status(201).json({ message: "Product created successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error." });
  }
});

module.exports = router;
