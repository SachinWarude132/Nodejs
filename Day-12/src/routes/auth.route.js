const express= require("express")
const usermodel = require("../models/user.model")
const jwt  = require("jsonwebtoken")
const AuthRouter = express.Router()
 AuthRouter.post("/register" , async(req ,  res)=>{
 
    const {email,name ,password} = req.body

const isUseralreadyExists = await usermodel.findOne({email})

if(isUseralreadyExists){
    return res.status(400).json({
        message : "User already exist with this email "
    })
}
    const user = await usermodel.create({
        email, password,name
    })

    const token = jwt.sign({
        id : user._id,
        email : user.email
    },
     
        process.env.JWT_SECRETE
    
)
    res.cookie("jwt-token" ,token)

    res.status(201).json({
        message : "user registereg",
          user,
          token
})
    
})

 module.exports = AuthRouter