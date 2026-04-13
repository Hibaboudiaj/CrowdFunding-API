const express = require("express");
require("dotenv").config();

const connectDB = require("./config/Db")

const authRoutes = require("./routes/auth.routes");

const protect = require("./middlewares/auth.middleware");

const authorize = require("./middlewares/role.middleware");

const projectRoutes = require("./routes/project.routes");

const investmentRoutes = require("./routes/investment.routes");

const app = express();

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes)

app.use("/api/projects", projectRoutes);

app.get ("/", (req, res)=>{
  res.send("API is working 🚀")
})

app.get("/api/test", protect, (req, res)=>{
  res.json({message:"You are authorized 🎉",user: req.user});
});

app.get("/api/admin", protect, authorize("admin"), (req, res) =>{
  res.json({ message: "Welcome Admin 👑"})
});

app.get("/api/owner", protect, authorize("owner"), (req, res) => {
  res.json({ message: "Welcome Owner 📁" });
});

app.get("/api/investor", protect, authorize("investor"), (req, res) => {
  res.json({ message: "Welcome Investor 💰" });
});

app.use("/api/investments", investmentRoutes);

app.listen(8000, () => {
  console.log("Server running on port http://localhost:8000 🚀"); 
})