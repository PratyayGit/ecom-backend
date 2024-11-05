const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    require: true,
  },
  adminPhoneNo: {
    type: String,
    require: true,
  },
  adminEmail: {
    type: String,
    required: true,
    unique: true,
  },
  adminPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin"],
    default: "admin",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  adminProfilePicture: {
    type: String,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
