const  express = require('express')
const app =express() // server ka instance create hua

app.get("/",(req,res)=>{
    res.send("NOo Wsdfsdfnjkdjjayy");
})
app.get("/about" ,(req ,res)=>{
    res.send("This is THe About get")
})
app.get("/home" ,(req ,res)=>{
    res.send("this is HOME page")
})
app.get("/ALL" , (req,res)=>{
    res.send("HAiaiaiiaiadfjsjjahsbdhabshjbadfjhsbfia")
})

app.listen(3000) // server run hoga