const express = require("express");
const { log } = require("node:console");

const app = express();

app.use(express.json());

app.get ("/", (req, res)=>{
  res.send("API is working 🚀")
})

app.listen(8000, () => {
  console.log("http://localhost:8000"); 
})