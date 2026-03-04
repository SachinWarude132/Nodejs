const express =  require("express")
const App  = express()
 App.use(express.json())
const notes = [
]
App.post("/notes", (req,res)=>{
    console.log(req.body);

    notes.push(req.body)
    res.send("Notes Created")
    
})
App.get("/notes",(req,res)=>{
    res.send(notes)
})
App.listen(3000,()=>{
    console.log("server is running on port 3000");
    
});
