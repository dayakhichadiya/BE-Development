class AppError extends Error {
    constructor(
        message,
        statusCode
    ) {
        super(message);

        this.statusCode = statusCode;

        Error.captureStackTrace(
            this,
            this.constuctor
        )
    }
}

module.exports = AppError;

// const AppError =
// require("../../utils/AppError");

// const getProduct = async (
//     productId
// ) => {

//     const product =
//         await Product.findById(
//             productId
//         );

//     if (!product) {
//         throw new AppError(
//             "Product not found",
//             404
//         );
//     }

//     return product;
// };