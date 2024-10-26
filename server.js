const express = require("express");
const logger = require("./logger"); // Import logger
const jwt = require("./middlewere/jwtVerify.js");
const dotenv = require("dotenv");
const path = require("path");
const setupSwagger = require("./swagger");
const bodyParser = require("body-parser");
const { authRoutes } = require("./routes/auth.route.js");
const { productRoutes } = require("./routes/product.route.js");
const { userpasswordreset } = require("./routes/forgetpass.route.js");
const connectDb = require("./config/db.js");

dotenv.config();
const app = express();
app.get("/", (req, res) => {
  logger.info("Home route accessed");
  res.send("Welcome to the Home page!");
});

app.get("/error", (req, res) => {
  logger.error("Error route accessed - something went wrong");
  res.status(500).send("An error occurred");
});
app.use((err, req, res, next) => {
  // Log any errors that reach this middleware
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  logger.error(`Express error: ${err.message}`);
  res.status(500).send("Server Error");
});
app.get("/download-logs", (req, res) => {
  const logFilePath = path.join(__dirname, "logs", "app.log"); // Using path to construct file path
  res.download(logFilePath, "app.log", (err) => {
    if (err) {
      logger.error("Error sending log file:", err);
      res.status(500).send("Error downloading log file");
    }
  });
});

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
app.use("/api/resetpass", userpasswordreset);
connectDb();

app.listen(3601, () => {
  console.log(`Server is running on port ${3601}`);
  logger.info("Server started on http://localhost:3601");
});
