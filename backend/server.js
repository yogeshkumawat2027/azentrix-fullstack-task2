import express from "express";

import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

dotenv.config();





app.use("/api/auth", authRoutes);


app.get("/" , (req,res)=>{
    res.json({ message : "api is running"});
});
 
app.listen(PORT, ()=>{
    console.log(`api is running on port ${PORT}`);
    connectDB();
});