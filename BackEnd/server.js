require("dotenv").config();
const express = require("express");
const cors = require('cors');
const path = require('path');
const connectDb = require("./config/db");
const authRoutes =require("./routes/authRoutes")
const incomeRoutes = require("./routes/incomeRoutes")

const app = express();  

app.use(
    cors({
      origin : process.env.CLIENT_URL || "*",
      methods : ["GET","PUT","POST","DELETE"],
      allowedHeaders : ["Content-Type", "Authorization"]
    })
);

app.use(express.json());

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/income",incomeRoutes);

app.use("/uploads",express.static(path.join(__dirname,"uploads")));

connectDb();

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server running on ${PORT}`));