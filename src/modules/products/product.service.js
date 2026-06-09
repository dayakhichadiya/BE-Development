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

const getAllProduct = async (query) => {

    const { search,
        page = 1,
        limit = 10,
        sort
    } = query;

    let filter = {};

    if (search) {
        filter.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                description: {
                    $regex: search,
                    $options: "i",
                },
            },
        ]
    }

    let sortOption = {};

    if (sort) {
        if (sort.startsWith("-")) {
            sortOption[sort.substring(1)] = -1
        } else {
            sortOption[sort] = 1
        }
    }

    const skip = (Number(page) - 1) * Number(limit);
    const totalProducts = await Product.countDocuments(filter);

    const products =
        await Product.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit));

    return {
        products,
        pagination: {
            currentPage: Number(page),
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
            limit: Number(limit)
        }
    }
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
    getAllProduct,
    updateProduct,
    deleteProduct,
}