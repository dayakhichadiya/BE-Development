const express = require("express");

const router = express.Router();

const { protect } = require("../../middlewares/auth.middleware");

const { createProduct, getProduct, updateProduct, deleteProduct } = require("./product.controller");

router.post("/", protect, createProduct);
router.get("/:id", getProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;