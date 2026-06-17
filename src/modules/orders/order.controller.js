const catchAsync = require("../../utils/catchAsync");
const orderService = require("./order.service");

const createOrder = catchAsync(async (req, res, next) => {

    const order = await orderService.createOrder(req.user._id)

    res.status(201).json({
        success: true,
        message: "Order placed successfully",
        data: order
    });
})

module.exports = {
    createOrder
}