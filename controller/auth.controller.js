// controllers/authController.js
const userService = require("../service/auth.service");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    await userService.register(email, password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const adminRegister = async (req, res) => {
  try {
    const adminData = ({
      adminName,
      adminPhoneNo,
      adminEmail,
      adminPassword,
      adminProfilePicture,
    } = req.body);
    await userService.adminRegister(adminData);
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token } = await userService.login(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const profile = async (req, res) => {
  try {
    const user = await userService.getProfile(req.user.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    await userService.forgotPassword(email);
    res.status(200).json({
      message: "Password reset email sent successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  profile,
  forgotPassword,
  adminRegister,
};
