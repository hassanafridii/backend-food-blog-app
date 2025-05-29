const express = require('express');
const app = express();

const dotenv = require('dotenv').config();
const connectDb = require('../config/connectionDb.js');
const cors = require('cors')

const PORT = process.env.PORT || 3000;
connectDb();
app.use(express.json())
app.use(express.static('public'))




// const allowedOrigins = [process.env.AllowedOrigin1, process.env.AllowedOrigin2];
const allowedOrigins = [
  "http://localhost:5173", // for local frontend
  "https://fronted-food-blog-app.vercel.app" // deployed frontend domain
]
// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ CORS blocked for origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

app.use("/",require("../routes/user.js"))
app.use('/recipe', require('../routes/recipe.js'));

app.listen(PORT, (err) => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app