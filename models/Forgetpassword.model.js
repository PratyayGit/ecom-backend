const mongoose = require("mongoose");

const passwordResetSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  attempts: { type: Number, default: 0 },
});

module.exports = mongoose.model("PasswordReset", passwordResetSchema);
