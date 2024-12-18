const express = require("express");
const router = express.Router();

const {
  login,
  profile,
  register,
  adminRegister,
} = require("../controller/auth.controller");
const jwt = require("../middlewere/jwtVerify");
router.post("/register", register);
router.post("/adminregister", adminRegister);

router.post("/login", login);

router.get("/profile", jwt, profile);

module.exports = { authRoutes: router };
