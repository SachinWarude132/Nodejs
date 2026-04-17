const express = require("express");
const userModel = require("../model/user.model");
const AuthRouter = express.Router();
const crypto = require("crypto")
const jwt = require("jsonwebtoken");
const { log } = require("console");


AuthRouter.post("/register" ,async(req, res)=>{
    const { name , email, password} = req.body
    const isUserExists = await userModel.findOne({email})
    if(isUserExists){
        res.status(409).json({
            message: "user alredy exists"
        })
    }
     const user = await userModel.create({
        name ,email,
        password:crypto.createHash("md5").update(password).digest('hex')
     })

   const token = jwt.sign(
    {
    id : user._id
   },process.env.JWT_SECRET

)

res.cookie("jwt-token" , token)
 res.status(201).json({
    message :"user Registered"
    , user
 })


})



AuthRouter.get("/get-me", async(req,res)=>{
    const token = req.cookies['jwt-token']
    const decode = jwt.verify(token,process.env.JWT_SECRET)
     const user = await userModel.findById(decode.id)
     res.status(200).json({
        name:user.name,
        email:user.email
     })
    
})

AuthRouter.post("/login" ,async(req,res)=>{
    const{email,password} = req.body

const user =  await userModel.findOne({ email})
 if(!user){
    return res.status(409).json({
        message:"Invalide Email"
    })
 }
 const hash = crypto.createHash('md5').update(password).digest('hex')
 const isPasswordCorrect = hash === user.password

    if(!isPasswordCorrect){
        return res.status(409).json({
            message: " Wrong Password"
        })
    }

 const token = jwt.sign(
    {
        id: user._id 
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }

 ) 
  res.cookie("jwt-token" ,token)
 res.status(200).json({
    message: "User logged in"
    ,
    name: user.name,
    email:user.email
 })
})


module.exports = AuthRouter;