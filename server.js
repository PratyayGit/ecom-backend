const express = require("express");
const jwt = require("./middlewere/jwtVerify.js");
const dotenv = require("dotenv");
const setupSwagger = require("./swagger");
const bodyParser = require("body-parser");
const { authRoutes } = require("./routes/auth.route.js");
const { productRoutes } = require("./routes/product.route.js");
const connectDb = require("./config/db.js");
dotenv.config();

const app = express();
app.use(
  express.json({
    verify: (req, res, buf) => {
      try {
        JSON.parse(buf);
      } catch (err) {
        console.error("Invalid JSON format:", err.message);
        throw new SyntaxError("Invalid JSON format"); // Handle this in a catch
      }
    },
  })
);

app.use(bodyParser.json());
// Centralized error handling middleware
app.use((req, res, next) => {
  req.on("data", (chunk) => {
    console.log("Incoming JSON payload chunk:", chunk.toString());
  });
  next();
});

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

connectDb();
app.listen(3601, () => {
  console.log(`Server is running on port ${3601}`);
});
