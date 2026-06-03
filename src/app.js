const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());    // allow frontend requests
app.use(express.json());   // Express can't read JSON automatically   without express.json the data becomes undefined

// TEST CONNECTION WITH WEB

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API Running"
    })
})

module.exports = app;