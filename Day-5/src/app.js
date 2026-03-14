const express = require("express")
const app =  express();
const notes = []
app.use(express.json())
app.post("/notes" , (req,res)=>{
    notes.push(req.body)
    res.status(201).json({
        message : "Note Created SuccessFully"
    })
  
})


app.get("/notes",(req,res)=>{
    res.status(200).json({
        notes: notes    
    })
})



app.delete("/notes/:id",(req,res)=>{
    delete notes[req.params.id]
    res.status(204).json({
        message : "Notes deleted Successfully"
    })
})


app.patch("/notes/:id",(req,res)=>{
    notes[req.params.id].description = req.body.description
    res.status(200).json({
        message : "Notes updated Successfullyy"
    })
})
 


module.exports = app