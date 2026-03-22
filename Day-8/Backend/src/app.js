const express = require("express")
const app = express()
const noteModel = require("./models/note.model")
const cors = require("cors")
app.use(cors())
app.use(express.json())
app.use(express.static("./public"))
/*
POST
-create a  new note and save the data in db
- req.body = {title ,description}
*/ 
app.post("/api/notes", async (req,res)=>{
    const {title,description} =  req.body
    const note = await noteModel.create({
        title,description
    })
    res.status(201).json({
        message:"Note has been created",
        note
    })
})

/*
GET/ api/ notes 
-fetch all the notes from the mongodb and send them in response
*/ 
app.get("/api/notes",async (req,res)=>{
 const note = await noteModel.find()

 res.status(200).json({
    message: "notes has been fetched",note

 })
})

/**
 DELETE/api/notes/:id
-find the id of note and delete it
- delete the note with id from req.params
 */
app.delete("/api/notes/:id",async (req,res)=>{
    const id = req.params.id
 await noteModel.findByIdAndDelete(id)


    res.status(200).json({
        message : "note deleted Successfully"
    })
    
})

/**
 PATCH/api/notes/:id
-update the description of the note by id
-req.body ={ description}

 */



app.patch("/api/notes/:id",async (req,res)=>{
    const id= req.params.id
   const {title,description} = req.body

  await noteModel.findByIdAndUpdate(id, { title,description })


  res.status(200).json({
    message:"NOte has been updated",
    
  })
})

const path = require("path")
app.use("*name",(req,res)=>{
    res.sendFile(path.join( __dirname ,  ".." ,"/public/index.html"))
})













module.exports= app