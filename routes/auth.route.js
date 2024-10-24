const express = require("express");
const router = express.Router();

const { login, profile, register } = require("../controller/auth.controller");
router.post("/register", register);

router.post("/login", login);

router.get("/profile", profile);

module.exports = { authRoutes: router };
