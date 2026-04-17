const mongoose =require("mongoose")
 async function connectedToDB (){
 await   mongoose.connect(process.env.MONGO_URI)
          console.log("server is Connected to Database");
}
 module.exports = connectedToDB