const express = require("express")
 const AuthRouter = require("../src/routes/auth.routes")
const cookieparser = require("cookie-parser")
 const app = express();
app.use(express.json());
app.use(cookieparser());

app.use("/api/auth" , AuthRouter)
module.exports = app