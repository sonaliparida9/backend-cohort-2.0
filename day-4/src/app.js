

/*
 - server create krna
 - server ko config krna
*/

const express = require("express")

const app = express() // server create ho jata hai

app.use(express.json())

const notes = [
    // {
    //     title: "test title 1",
    //     discription: "test discription 1"
    // }
]
app.get("/",(req, res)=>{
    res.send("hello world")
})

app.post("/notes",(req, res)=>{
    console.log(req.body)
    notes.push(req.body)

    console.log(notes)

    res.send("create notes")
})

app.get("/notes", (req, res)=>{
    res.send(notes)
})
// DELETE /notes
// params

// delete/notes/2
app.delete("/notes/:index", (req, res)=>{
    delete notes[req.params.index]

    res.send("note deleted successfully")
})

// patch /notes/:index
// req.body = {description :- "sample modified description."}

app.patch("/notes/:index", (req, res)=>{
    notes[ req.params.index].description = req.body.description
    res.send("update successfully")
})

module.exports = app