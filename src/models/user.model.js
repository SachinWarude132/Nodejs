const mongoose = require("mongoose")
 const userSchema =  new mongoose.Schema({

username:{
    type: String,
    unique:[ true ,"user already exists "],
    required :[true ,"Username is required"]
}
,
email:{
    type:String,
    unique:[true , "Email already exist"],
    required:[true , "Email is required"]
}
,
password:{
 type : String ,
 required:[true , "Password is required"]

}
,
bio:String ,
profileImage:{
    type:String,
    default:"https://ik.imagekit.io/kgvvmhdgj0/defaulr.png"
}

 })
  const userModel = mongoose.model("User" ,userSchema)
  module.exports =userModel