const express = require("express");

const router = express.Router();

const { register, login, getProfile, updateProfile, changePassword } = require('./auth.controller');
const { protect } = require("../../middlewares/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.put("/update-profile", protect, updateProfile);
router.patch("/change-password", protect, changePassword)
module.exports = router;