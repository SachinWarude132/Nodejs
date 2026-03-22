const mongoose = require("mongoose")

const Noteschema = new mongoose.Schema({
    title:String,
    description:String
})
const noteModel = mongoose.model("notes", Noteschema)
module.exports = noteModel 