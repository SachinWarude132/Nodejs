const express = require("express")
const app = express()




app.use(express.json())
const notes=[

]
// Post
app.post("/notes",(req,res)=>{
    res.send("got it")
    notes.push(req.body)
})
// GET
app.get("/notes",(req,res)=>{
    res.send(notes)
})
// Delete
app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]
    res.send("note deleted successfully")
})

// Patch
app.patch("/notes/:index",(req,res)=>{
     notes[req.params.index].description = req.body.description
     res.send("Notes updated")
    
})

module.exports = app
