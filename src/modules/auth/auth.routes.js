const express = require("express");

const router = express.Router();

const { register, login, getProfile } = require('./auth.controller');
const {protect} = require("../../middlewares/auth.middleware");
console.log({
  register: typeof register,
  login: typeof login,
  getProfile: typeof getProfile,
  protect: typeof protect,
});

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);

module.exports = router;