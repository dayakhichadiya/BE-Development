const express = require("express");

const router = express.Router();

const { protect } = require("../../middlewares/auth.middleware");

const {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
} = require("./product.controller");

router.post("/", protect, createProduct);
router.get("/:id", getProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);
router.get("/", getAllProduct);

module.exports = router;