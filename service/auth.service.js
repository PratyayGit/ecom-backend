// services/userService.js
const User = require("../models/User.model");
const AdminModel = require("../models/Admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendWelcomeEmail } = require("../mailsend/emailService");
const uploadImage = require("../service/imageUpload.service");
// Register Section
const register = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  await sendWelcomeEmail(email.split("@")[0], email);
  return user;
};
const adminRegister = async (adminData) => {
  const {
    adminName,
    adminPhoneNo,
    adminEmail,
    adminPassword,
    adminProfilePicture,
  } = adminData;
  let convertedimage = null;
  if (adminProfilePicture) {
    convertedimage = uploadImage(adminProfilePicture);
  }
  const hashedPassword = await bcrypt.hash(adminPassword, 11);
  const admin = new AdminModel({
    adminName,
    adminPhoneNo,
    adminEmail,
    adminPassword: hashedPassword,
    adminProfilePicture: convertedimage,
  });
  await admin.save();
  await sendWelcomeEmail(adminName, adminEmail);
};
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return { user, token };
};

const getProfile = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found.");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expiration time
  });

  // Send reset email (assume this function is implemented)
  await sendPasswordResetEmail(user.email, user.firstName, token);
  return token;
};

module.exports = {
  register,
  adminRegister,
  login,
  getProfile,
  forgotPassword,
};
