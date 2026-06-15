const jwt = require('jsonwebtoken');
const User = require("../modules/auth/user.model")

const protect = async (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new Error("Access Denied");
        }

        //extract token
        const token = authHeader.split(" ")[1];

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //get user from database;
        const user = await User.findById(decoded.userId)
            .select("-password") //why userId because token only conduct userId and role

        if (!user) {
            throw new Error("User not Found");
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    protect
}