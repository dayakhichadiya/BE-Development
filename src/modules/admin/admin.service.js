const User = require("../auth/user.model");
const Product = require("../products/product.model");
const Order = require("../orders/order.model");

const getDashboardStats = async () => {
    const [totalUser, totalProducts, dashboardData] = await Promise.all([User.countDocuments(), Product.countDocuments()]);

    Order.aggregate([
        {
            $facet: {   //run multiple pipelines in one query
                orderStats: [{
                    $group: {
                        _id: null,
                        totalOrders: { $sum: 1 },
                        totalRevenue: { $sum: "$totalAmount" }
                    }
                }],
                topProducts: [
                    {
                        $unwind: "$items"
                    },
                    {
                        $group: {
                            _id: "$items.prodcutId",
                            totalSold: {
                                $sum: "$items.quantity"
                            }
                        }
                    },
                    {
                        $sort: {
                            totalSold: -1
                        }
                    },
                    {
                        $limit: 5
                    },
                    {
                        $lookup: {
                            from: "products",
                            localField: "_id",
                            foreignField: "_id",
                            as: "product"
                        }
                    },
                    {
                        $unwind: "$product"
                    }
                ]
            }
        }
    ]);

    const stats = dashboardData[0];

    return {
        totalUser,
        totalProducts
    }
}


// const getDashboardStats = async () => {
//   const [totalUsers, totalProducts, dashboardData] = await Promise.all([
//     User.countDocuments(),
//     Product.countDocuments(),
//     Order.aggregate([
//       {
//         $facet: {

//           orderStats: [
//             {
//               $group: {
//                 _id: null,
//                 totalOrders: { $sum: 1 },
//                 totalRevenue: { $sum: "$totalAmount" }
//               }
//             }
//           ],

//           topProducts: [
//             {
//               $unwind: "$items"
//             },
//             {
//               $group: {
//                 _id: "$items.productId",
//                 totalSold: {
//                   $sum: "$items.quantity"
//                 }
//               }
//             },
//             {
//               $sort: {
//                 totalSold: -1
//               }
//             },
//             {
//               $limit: 5
//             },
//             {
//               $lookup: {
//                 from: "products",
//                 localField: "_id",
//                 foreignField: "_id",
//                 as: "product"
//               }
//             },
//             {
//               $unwind: "$product"
//             },
//             {
//               $project: {
//                 _id: 1,
//                 totalSold: 1,
//                 productName: "$product.name",
//                 price: "$product.price"
//               }
//             }
//           ],

//           monthlyRevenue: [
//             {
//               $group: {
//                 _id: {
//                   year: {
//                     $year: "$createdAt"
//                   },
//                   month: {
//                     $month: "$createdAt"
//                   }
//                 },
//                 revenue: {
//                   $sum: "$totalAmount"
//                 },
//                 orders: {
//                   $sum: 1
//                 }
//               }
//             },
//             {
//               $sort: {
//                 "_id.year": 1,
//                 "_id.month": 1
//               }
//             }
//           ],

//           recentOrders: [
//             {
//               $sort: {
//                 createdAt: -1
//               }
//             },
//             {
//               $limit: 5
//             },
//             {
//               $lookup: {
//                 from: "users",
//                 localField: "userId",
//                 foreignField: "_id",
//                 as: "user"
//               }
//             },
//             {
//               $unwind: "$user"
//             },
//             {
//               $project: {
//                 totalAmount: 1,
//                 status: 1,
//                 createdAt: 1,
//                 customerName: "$user.name"
//               }
//             }
//           ]
//         }
//       }
//     ])
//   ]);

//   const stats = dashboardData[0];

//   return {
//     totalUsers,
//     totalProducts,
//     totalOrders: stats.orderStats[0]?.totalOrders || 0,
//     totalRevenue: stats.orderStats[0]?.totalRevenue || 0,
//     topProducts: stats.topProducts,
//     monthlyRevenue: stats.monthlyRevenue,
//     recentOrders: stats.recentOrders
//   };
// };

// const adminService = require("../services/admin.service");

// const getDashboard = async (req, res, next) => {
//   try {
//     const data = await adminService.getDashboardStats();

//     return res.status(200).json({
//       success: true,
//       data
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// Runs multiple pipelines in one query.

// {
//   $facet: {
//     topProducts: [...],
//     monthlyRevenue: [...],
//     recentOrders: [...]
//   }
// }


// 7. $limit
// {
//   $limit:5
// }
// 
// Returns only the top 5 products or latest 5 orders.


module.exports = {
    getDashboardStats
};