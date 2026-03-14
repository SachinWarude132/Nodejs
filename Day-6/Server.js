const { default: mongoose } = require("mongoose");
const app =  require("./src/App")

function connecttoDB(){
    mongoose.connect("mongodb+srv://Sachin:5zhzBVEyshsUy3eN@cluster0.7me45hx.mongodb.net/Day-6")
    .then(()=>{
        console.log("Connnected to Database");
        
    })
}
connecttoDB()
app.listen(3000,()=>{
    console.log("Server is running on Port 3000");
    
})