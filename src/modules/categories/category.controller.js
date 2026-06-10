const categoryService = require('./category.service');

const createCategory = async (req, res, next) => {
    try {

        const category = await categoryService.createCategory(req.body)

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category
        })

    } catch (error) {
        next(error)
    }
}

const updateCategory = async (req, res, next) => {
    try {
        const category = await categoryService.updateCategory(req.params.id, req.body)

        res.status(200).json({
            success: true,
            message: "Category Updated Successfully",
            data: category
        })
    } catch (error) {
        next(error)
    }
}

const getAllCategory = async (req, res, next) => {
    try {
        const category = await categoryService.getAllCategory();

        res.status(200).json({
            success: true,
            message: "Fetched all Category",
            data: category
        })
    } catch (error) {
        next(error)
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const category = await categoryService.deleteCategory(req.params.id)

        res.status(200).json({
            success: true,
            message: "Category Deleted Successfully",
            data: category
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createCategory,
    updateCategory,
    getAllCategory,
    deleteCategory,
}