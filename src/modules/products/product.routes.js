const express = require("express");

const router = express.Router();

const { protect } = require("../../middlewares/auth.middleware");
const { authorize } = require("../../middlewares/role.middleware")

const {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProductWithCategory
} = require("./product.controller");

router.post("/", protect, authorize("admin"), createProduct);
router.get("/category-wise", getProductWithCategory);
router.get("/:id", getProduct);
router.put("/:id", protect, authorize("admin"), updateProduct); //need to add
router.delete("/:id", protect, authorize("admin"), deleteProduct); //need to add here
router.get("/", getAllProduct);

module.exports = router;