const express = require("express");

const dotenv = require("dotenv");
const setupSwagger = require("./swagger");
const { authRoutes } = require("./routes/auth.route.js");
const productRoutes = require("./routes/product.route.js");
const connectDb = require("./config/db.js");
dotenv.config();

const app = express();
app.use(express.json());

// health api
app.get("/health", (req, res) => {
  try {
    res.json({
      service: "server is running",
      status: "Active",
      time: new Date(),
    });
  } catch (error) {
    console.log(error);
  }
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use((req, res, next) => {
  next();
  console.log("hit here");
});
connectDb();
app.listen(3601, () => {
  console.log(`Server is running on port ${3601}`);
});
