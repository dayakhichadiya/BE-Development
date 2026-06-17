const express = require("express");
const { protect } = require("../../middlewares/auth.middleware");
const { 
    addToCart,
    getMyCart,
    removeFromCart
} = require("./cart.controller");

const router = express.Router()

router.get("/:id", protect, getMyCart)
router.post("/add-to-cart", protect, addToCart)
router.delete("/remove-from-cart/:cartId", protect, removeFromCart)

module.exports = router