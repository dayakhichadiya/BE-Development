const ErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong",
        // error: err
    })
}

module.exports = ErrorHandler;