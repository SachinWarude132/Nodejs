const express = require("express")
const authcontroller = require("../controllers/auth.controller")
 const authRouter = express.Router()

 authRouter.post('/register' ,authcontroller.registerController )

 authRouter.post("/login", authcontroller.loginCntroller )


 module.exports = authRouter