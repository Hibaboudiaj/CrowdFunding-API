const express = require("express");
require("dotenv").config();

const connectDB = require("./config/Db")

const authRoutes = require("./routes/auth.routes");

const protect = require("./middlewares/auth.middleware");

const app = express();

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes)

app.get ("/", (req, res)=>{
  res.send("API is working 🚀")
})

app.get("/api/test", protect, (req, res)=>{
  res.json({message:"You are authorized 🎉",user: req.user});
});

app.listen(8000, () => {
  console.log("Server running on port http://localhost:8000 🚀"); 
})