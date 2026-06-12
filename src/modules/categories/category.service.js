const Category = require('./category.model');

const createCategory = async (payload) => {

    const existingCat = await Category.findOne({
        name: payload.name
    })

    if (existingCat) {
        throw new Error("Category already exist");
    }

    const category = await Category.create({
        ...payload,
    })

    return category;
}

const updateCategory = async (id, payload) => {
    const category = await Category.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    })

    if (!category) {
        throw new Error('Category Id not found');
    }
    return category;
}

const getAllCategory = async () => {
    const category = await Category.find()

    return category
}

const deleteCategory = async (id) => {
    const category = await Category.findByIdAndDelete(id);

    if(!category){
        throw new Error('category Id not found');
    }
    return category;
}

module.exports = {
    createCategory,
    updateCategory,
    getAllCategory,
    deleteCategory,
}