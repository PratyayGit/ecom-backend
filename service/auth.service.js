// services/userService.js
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendWelcomeEmail } = require("../mailsend/emailService");

const register = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  await sendWelcomeEmail(email.split("@")[0], email);
  return user;
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
  login,
  getProfile,
  forgotPassword,
};
