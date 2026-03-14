const express = require("express")
const app = express()
app.use(express.json())
 app.get("/",(req,res)=>{
    console.log("is it working");
    
 })

module.exports= app