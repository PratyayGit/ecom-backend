// controllers/passwordResetController.js
const passwordResetService = require("../service/reserpass.service");

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const message = await passwordResetService.forgotPassword(email);
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const message = await passwordResetService.verifyOTP(email, otp);
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const message = await passwordResetService.resetPassword(
      email,
      newPassword
    );
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  forgotPassword,
  verifyOTP,
  resetPassword,
};
