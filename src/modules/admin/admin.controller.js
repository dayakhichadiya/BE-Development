const catchAsync = require("../../utils/catchAsync");
const adminService = require("./admin.service");


const getDashboard = catchAsync(async (req, res, next) => {

    const data = await adminService.getDashboardStats();
    
    return res.status(200).json({
        success: true,
        message: "Fetched Dashboard data",
        data
    })
})

module.exports = getDashboard;