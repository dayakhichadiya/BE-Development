const Product = require("./product.model");

const createProduct = async (payload, userId) => {
    const product = await Product.create({
        ...payload,
        createdBy: userId,
    });

    return product;
};

const getProduct = async (productId) => {
    const product = await Product.findById(productId)

    if (!product) {
        throw new Error('Product Id not found')
    }
    return product;
}

const updateProduct = async (productId, payload) => {
    const product = await Product.findByIdAndUpdate(productId, payload, {
        new: true,
        runValidators: true,
    })

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
}

const deleteProduct = async (productId) => {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
        throw new Error('Poduct not found');
    }
    return product;
}

module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
}