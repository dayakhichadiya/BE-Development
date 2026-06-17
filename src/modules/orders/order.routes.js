const express = require("express");

const router = express.Router();

const { protect } = require("../../middlewares/auth.middleware")
const { createOrder } = require("./order.controller");

router.post("/create", protect, createOrder);

module.exports = router;