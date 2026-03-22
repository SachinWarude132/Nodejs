require("dotenv").config()
const app = require("./src/app")  
const connectTODB = require("./src/config/Database")  


connectTODB()
app.listen(3000,()=>{
    console.log("code is running on port 3000");
    
})