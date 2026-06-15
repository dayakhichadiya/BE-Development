const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema);