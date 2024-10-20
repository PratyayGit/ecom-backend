const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const setupSwagger = require("./swagger");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection failed:", error));
setupSwagger(app);
// Define a simple route
app.get("/", (req, res) => {
  res.send("API is running...");
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.listen(3601, () => {
  console.log(`Server is running on port ${3601}`);
});
