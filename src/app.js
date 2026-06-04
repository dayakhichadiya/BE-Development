const express = require('express');
const cors = require('cors');

const authRoutes = require("./modules/auth/auth.routes")
const app = express();

app.use(cors());    // allow frontend requests
app.use(express.json());   // Express can't read JSON automatically   without express.json the data becomes undefined


app.use("/api/auth", authRoutes);


// TEST CONNECTION WITH WEB

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API Running"
    })
})

module.exports = app;