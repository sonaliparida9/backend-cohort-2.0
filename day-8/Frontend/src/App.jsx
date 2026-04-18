import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])

  // console.log("Hello Integration")

  function fetchNotes(){
     axios.get("http://localhost:3000/api/notes")
  .then(res=>{
    // console.log(res.data.notes)
     setNotes(res.data.notes)
  })
  }

  
  useEffect(()=>{
   fetchNotes()
  },[])   // using useEffect to fetch data from backend when component mounts
          // multiful times app componet will render and we have to avoid that so we will pass empty array as second argument in useEffect

  function handelSubmit(e){
    e.preventDefault()

    const {title,description} = e.target.elements

    console.log(title.value, description.value)

    axios.post("http://localhost:3000/api/notes", {
      title: title.value,
      description: description.value
    })
    .then(res => {
      console.log(res.data)

      fetchNotes()  // after creating new note we have to fetch all notes again to update the UI
    })
  }

  function handleDeleteNote(noteId){
    console.log(noteId)

    axios.delete("http://localhost:3000/api/notes/" +noteId)
    .then(res => {
      console.log(res.data)

      fetchNotes()  // after deleting note we have to fetch all notes again to update the UI
    })    
  }

  function handleUpdateNote(noteId){
    const newDescription = prompt("Enter new description")
    
    axios.patch("http://localhost:3000/api/notes/" + noteId, {
      description: newDescription
    })
    .then(res => {
      console.log(res.data)

      fetchNotes()  // after updating note we have to fetch all notes again to update the UI
    })    
  }

  return (
    <>

    <form className='note-create-form' onSubmit={handelSubmit}>
      <input name='title' type="text" placeholder='Enter title' />
      <input name='description' type="text" placeholder='Enter description' />
      <button>Create note</button>
    </form>
    <div className='notes'>
      {notes.map(note=>{
        return <div className='note'>
        <h1>{note.title}</h1>
        <p>{note.description}</p>
        <button className='btn' onClick={() => handleDeleteNote(note._id)}>delete</button>
        <button className='btn' onClick={()=>handleUpdateNote(note._id)}>update</button>
      </div>
      })}
      
    </div>
    </>
  )
}

export default App