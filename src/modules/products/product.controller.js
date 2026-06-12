const catchAsync = require("../../utils/catchAsync");
const productService = require("./product.service");

const createProduct = async (req, res, next) => {
    try {
        const product = await productService.createProduct(
            req.body,
            req.user._id
        );

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });

    } catch (error) {
        next(error);
    }
};

const getProduct = async (req, res, next) => {
    try {
        const product = await productService.getProduct(req.params.id)

        res.status(200).json({
            success: true,
            data: product
        })
    } catch (error) {
        next(error);
    }
}

const getAllProduct = async (req, res, next) => {
    try {
        const result = await productService.getAllProduct(req.query);
        res.status(200).json({
            success: true,
            message: "Fetch all Products",
            data: result.products,
            pagination: result.pagination
        })
    } catch (error) {
        next(error);
    }
}

const getProductWithCategory = catchAsync(async (req, res, next) => { //why catchAsync <- no need to write everywhere try/catch

    const product = await productService.getProductWithCategory();
    res.status(200).json({
        success: true,
        message: "Fetch all Products",
        data: product,
    })

})

const updateProduct = async (req, res, next) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body)

        res.status(200).json({
            success: true,
            message: "Product details updated successfully",
            data: product
        })
    } catch (error) {
        next(error);
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const product = await productService.deleteProduct(req.params.id)

        res.status(200).json({
            success: true,
            messge: "Product deleted successfully",
            data: product
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProductWithCategory
};