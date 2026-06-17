const Cart = require("../cart/cart.model");
const Product = require("../products/product.model");
const Order = require("./order.model");

const createOrder = async (userId) => {

    //get the user cart items : 

    const cartItems = await Cart.find({  // why find method ? => Fetches all cart documents belonging to the user.
        user: userId
    }).populate("product");

    if (!cartItems.length) {
        throw new Error("Cart is Empty");
    }

    let totalAmount = 0;

    const orderItems = [];  //[] bcz order have multiple items

    for (const item of cartItems) {

        const product = item.product;

        if (item.quantity > product.stock) {
            throw new Error(`${product.name} has only ${product.stock} items left`)
        }

        totalAmount += product.price * item.quantity;

        orderItems.push({
            product: product._id,
            quantity: item.quantity,
            price: product.price
        })
    }

    const order = await Order.create({
        user: userId,
        items: orderItems,
        totalAmount
    })

    for (const item of cartItems) {  //why again loop bcz now the order is created so need to reduce the product stock
        await Product.findByIdAndUpdate(
            item.product._id,
            {
                $inc: {
                    stock: -item.quantity, //mongo db manually - the stock = 20, and quantity order = 3 then it will -3 from the quantity directly
                }
            }
        );
    }

    await Cart.deleteMany({ user: userId }); // after placing order need to remove the cart items

    return order;
}

module.exports = {
    createOrder
}