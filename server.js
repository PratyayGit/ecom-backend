const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection failed:", error));

// Define a simple route
app.get("/", (req, res) => {
  res.send("API is running...");
});
// Routes
app.use("/api/auth", authRoutes);
app.listen(3600, () => {
  console.log(`Server is running on port ${3600}`);
});
