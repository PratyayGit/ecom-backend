const express = require("express");
const router = express.Router();
const {
  forgotPassword,
  verifyOTP,
  resetPassword,
} = require("../controller/resetpass.controller");
router.post("/forgetpass", forgotPassword);
router.post("/verifyopt", verifyOTP);
router.post("/resetpassword", resetPassword);
module.exports = { userpasswordreset: router };
