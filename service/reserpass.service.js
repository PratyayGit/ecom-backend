// services/passwordResetService.js
const PasswordReset = require("../models/Forgetpassword.model");
const User = require("../models/User.model");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const { sendPasswordResetEmail } = require("../mailsend/emailService");

const generateOTP = () => {
  // Generate a 6-digit numeric OTP
  return otpGenerator.generate(6, {
    digits: true,
    upperCase: false,
    specialChars: false,
  });
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  const passwordReset = new PasswordReset({
    email,
    otp,
    expiresAt,
  });

  await passwordReset.save();
  await sendPasswordResetEmail(email, otp, email);

  return "OTP sent to your email.";
};

const verifyOTP = async (email, otp) => {
  const resetEntry = await PasswordReset.findOne({ email });

  if (!resetEntry) {
    throw new Error("No reset request found.");
  }

  if (resetEntry.attempts >= 3) {
    throw new Error("Maximum attempts exceeded.");
  }

  if (resetEntry.expiresAt < Date.now()) {
    throw new Error("OTP has expired.");
  }

  if (resetEntry.otp !== otp) {
    // Increment attempts if OTP is incorrect
    resetEntry.attempts += 1;
    await resetEntry.save();
    throw new Error(`Invalid OTP. Attempts left: ${3 - resetEntry.attempts}`);
  }

  // Remove entry after successful verification
  await PasswordReset.deleteOne({ email });
  return "OTP verified successfully.";
};

const resetPassword = async (email, newPassword) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found.");
  }

  // Hash the new password before saving
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword; // Update the user's password
  await user.save(); // Save the updated user

  return "Password reset successful.";
};

module.exports = {
  forgotPassword,
  verifyOTP,
  resetPassword,
};
