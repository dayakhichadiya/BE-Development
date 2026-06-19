const express = require("express");
const getDashboard = require("./admin.controller");
const { protect } = require("../../middlewares/auth.middleware");
const router = express();


router.get("/dashboard", protect, getDashboard)

module.exports = router;