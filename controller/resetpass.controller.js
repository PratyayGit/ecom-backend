const PasswordReset = require("../models/Forgetpassword.model"); // Adjust the path as needed
const User = require("../models/User.model");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const { sendPasswordResetEmail } = require("../mailsend/emailService");
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Check if the user exists in your User collection (not shown)
  const user = User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  const passwordReset = new PasswordReset({
    email,
    otp,
    expiresAt,
  });

  try {
    await passwordReset.save();

    await sendPasswordResetEmail(email, otp, email);
    return res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const resetEntry = await PasswordReset.findOne({ email });

    if (!resetEntry) {
      return res.status(400).json({ error: "No reset request found." });
    }

    // Check if the OTP is valid and hasn't expired
    if (resetEntry.attempts >= 3) {
      return res.status(400).json({ error: "Maximum attempts exceeded." });
    }

    if (resetEntry.expiresAt < Date.now()) {
      return res.status(400).json({ error: "OTP has expired." });
    }

    if (resetEntry.otp !== otp) {
      // Increment attempts if OTP is incorrect
      resetEntry.attempts += 1;
      await resetEntry.save();
      return res.status(400).json({
        error: "Invalid OTP. Attempts left: " + (3 - resetEntry.attempts),
      });
    }

    // If OTP is valid, proceed to reset password
    // You may want to delete the entry or mark it as used
    await PasswordReset.deleteOne({ email }); // Remove entry after successful verification
    return res.status(200).json({ message: "OTP verified successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

function generateOTP() {
  // Generate a 6-digit numeric OTP
  const otp = otpGenerator.generate(6, {
    digits: true,
    upperCase: false,
    specialChars: false,
  });
  return otp;
}
const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword; // Update the user's password
    await user.save(); // Save the updated user

    return res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  verifyOTP,
  forgotPassword,
  resetPassword,
};
