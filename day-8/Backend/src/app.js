// server create krna
const express = require("express");
const noteModel = require("./models/notemodel")
const cors = require("cors")
const path = require("path")

const app = express();
app.use(cors())
app.use(express.json());

// request aayega toh public folder ke andar se static file serve krna hai
// public folder ke andar index.html file hai toh wo serve krna hai
// http://localhost:3000/assets/index-a0Tcu7_O.js
app.use(express.static("./public"))

// POST/api/notes
// create new note and save data in mongoose;
// request body => {title, description}
app.post("/api/notes",async (req, res)=>{
    const{ title, description } = req.body

    const notes = await noteModel.create({
        title,description
    })

    res.status(201).json({
        message: "note created successfully",
        notes
    })
})

// fetch all notes from database
app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find();

    res.status(200).json({
        message: "notes fetched successfully",
        notes
    })
})

// GET/api/notes/:id
// Delete note with the id from req.params
app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "note deleted successfully",
        
    })
})
    
// PATCH/api/notes/:id
// Update the description of the note by id
// req.body = {description}
app.patch("/api/notes/:id", async(req, res) => {
    const id = req.params.id
    const {description} = req.body

    await noteModel.findByIdAndUpdate(id, { description })
    res.status(200).json({
        message: "note updated successfully"
    })
})

app.use('*name', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/public/index.html'))
})

module.exports = app;