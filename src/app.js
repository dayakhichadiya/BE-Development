const express = require('express');
const cors = require('cors');

const authRoutes = require("./modules/auth/auth.routes")
const productRoutes = require("./modules/products/product.routes");
const categoryRoutes = require("./modules/categories/category.routes");
const cartRoutes = require("./modules/cart/cart.routes");
const ErrorHandler = require('./middlewares/error.middleware');
const app = express();

app.use(cors());    // allow frontend requests
app.use(express.json());   // Express can't read JSON automatically   without express.json the data becomes undefined


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/cart", cartRoutes)


// TEST CONNECTION WITH WEB

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API Running"
    })
})


// must be in last
app.use(ErrorHandler);


module.exports = app;