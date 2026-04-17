
const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require('jsonwebtoken')
const Module = require("module")
 
async function registerController (req,res){

    const{ username,email,password,bio,profileImage}= req.body

    const isUseralreadyExists = await userModel.findOne({
        $or : [
            {email},
            {username}
        ]
    })

    if(isUseralreadyExists){
        return res.status(409).json({
            message :"User already exists" + (isUseralreadyExists).email == email 
            ? "email already exists":"Username already exists"        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password : hash
 })
    const token = jwt.sign({
        id:user._id
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    }
    )
  res.cookie("Token",token)
    res.status(201).json({
        message: "user is registered",
        user :{
            email:user.email,
            username: user.username,
            bio:user.bio,
            profileImage: user.profileImage
        }
    })
 }

async function loginCntroller (req,res){
    const {username , email, password} = req.body
     const user = await userModel.findOne({
        $or:[
            {username:username},
            {
                email: email
            }
        ]
     })

     if(!user){
        return res.status(409).json({
            message:"User does not Found"
        })
     }
      const hash = crypto.createHash("sha256").update(password).digest("hex")
      const ispasswordcorrect = hash == user.password

    if(!ispasswordcorrect){
        return res.status(409).json({
            message:"Invalide Password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET,
    {expiresIn:"1d"}
        )

        res.cookie('Token' , token)

        res.status(201).json({
            message:"user logged in",
            user:{
                username:user.username,
                email:user.email
            }
        })


 }
 
 module.exports ={
    registerController ,
    loginCntroller  
 }