const express = require('express');
const app = express();

const dotenv = require('dotenv').config();
const connectDb = require('../config/connectionDb.js');
const cors = require('cors')

const PORT = process.env.PORT || 3000;
connectDb();
app.use(express.json())
app.use(express.static('public'))




const allowedOrigins = [process.env.AllowedOrigin1, process.env.AllowedOrigin2];

// CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            console.error(`Blocked by CORS: ${origin}`);
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET, POST, PUT, DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/",require("../routes/user.js"))
app.use('/recipe', require('../routes/recipe.js'));

app.listen(PORT, (err) => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app