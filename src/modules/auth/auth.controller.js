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

const login = async (req, res, next) => {
    try {
        const user = await authService.loginUser(req.body);  // why req.body because in service we passed payload and payload = req.body

        res.status(200).json({
            success: true,
            message: "User login Successfully",
            data: user,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getProfile = (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user
    })
}

module.exports = {
    register,
    login,
    getProfile,
}