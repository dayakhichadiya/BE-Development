const Cart = require("./cart.model");
const Product = require("../products/product.model")  //get both table product and cart

const addToCart = async (userId, payload) => {
    const { productId, quantity } = payload;

    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Product not Found");
    }

    const existingCart = await Cart.findOne({
        user: userId,
        product: productId
    });

    if (existingCart) {
        existingCart.quantity += quantity;

        await existingCart.save();

        return existingCart;
    }

    const cart = await Cart.create({
        user: userId,
        product: productId,
        quantity
    })

    return cart;
}

const getMyCart = async (userId) => {
    return await Cart.find({
        user: userId
    }).
        populate(
            "product",
            "name price image stock"
        )
}

const removeFromCart = async (userId, cartId) => {
    const cartItem = await Cart.findOneAndDelete({
        _id: cartId,
        user: userId
    });

    if (!cartItem) {
        throw new Error("Cart not found");
    }

    return cartItem;
}

module.exports = {
    addToCart,
    getMyCart,
    removeFromCart
}