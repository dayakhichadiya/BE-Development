const catchAsync = require("../../utils/catchAsync");
const cartService = require("./cart.service");

const addToCart = catchAsync(async (req, res, next) => {

    const cart = await cartService.addToCart(req.user._id, req.body);
    res.status(201).json({
        message: "Added to cart",
        success: true,
        data: cart
    })
})

const getMyCart = catchAsync(async (req, res, next) => {
    const cart = await cartService.getMyCart(req.params.id);
    res.status(200).json({
        message: "Successfully fetched all cart items",
        success: true,
        data: cart
    })

})

const removeFromCart = catchAsync(async (req, res) => {
    const cart = await cartService.removeFromCart(req.user.id, req.params.cartId)
    res.status(200).json({
        message: "Item Removed from cart",
        success: true,
        data: cart
    })
})

module.exports = {
    addToCart,
    getMyCart,
    removeFromCart
}