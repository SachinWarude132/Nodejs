const  express = require('express')
const app =express() // server ka instance create hua

app.get("/",(req,res)=>{
    res.send("Helloo mate");
})
app.get("/about" ,(req ,res)=>{
    res.send("This is THe About ge")
})
app.get("/home" ,(req ,res)=>{
    res.send("this is HOME page")
})
app.get("/ALL" , (req,res)=>{
    res.send("iiisiiiiiiiiisiiiiiiisirsasjjerj")
})

app.listen(3000) // server run hoga