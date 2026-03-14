const app = require("./src/app")
const mongoose =  require("mongoose")

const ConnectToDB = require("./src/config/Database")
require("dotenv").config()
 



ConnectToDB()
app.listen(3000, ()=>{
    console.log("Server is running on 3000");
    
})