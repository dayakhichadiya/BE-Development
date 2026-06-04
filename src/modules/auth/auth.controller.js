const authService = require("./auth.service")

const register = async (req, res, next) => {
    try {
        const user = await authService.registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "User Registered successfully",
            data: user,
        })
    } catch (error) {
        // next(error);   // add when middleware is ready
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    register,
}