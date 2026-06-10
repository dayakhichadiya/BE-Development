const express = require('express');

const router = express.Router();
const { protect } = require('../../middlewares/auth.middleware');

const {
    createCategory,
    updateCategory,
    getAllCategory,
    deleteCategory,
} = require('./category.controller');

router.post("/", protect, createCategory);
router.put("/update/:id", protect, updateCategory);
router.get("/get-all", protect, getAllCategory);
router.delete("/:id", protect, deleteCategory);

module.exports = router;