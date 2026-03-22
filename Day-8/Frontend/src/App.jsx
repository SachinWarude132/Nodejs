import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  // 🔥 Update states
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")
  const [edittitle, setedittitle] = useState('')
  
  const fetchData = () => {
    axios.get("http://localhost:3000/api/notes")
      .then((res) => {
        setNotes(res.data.note)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])

  // ➕ Create
  function handleSubmit(e) {
    e.preventDefault()

    axios.post("http://localhost:3000/api/notes", {
      title,
      description
    }).then(() => {
      fetchData()
      setTitle("")
      setDescription("")
    })
  }

  // ❌ Delete
  function handleDelete(id) {
    axios.delete("http://localhost:3000/api/notes/" + id)
      .then(() => {
        fetchData()
      })
  }

  // ✏️ Update API call
  function handleUpdate(id, newtitle ,newDesc) {
    console.log(newtitle, newDesc);
    
    axios.patch("http://localhost:3000/api/notes/" + id, {
      title : newtitle ,
      description: newDesc
    }).then(() => {
      fetchData()
      setEditingId(null) // close edit mode
    })
  }

  return (
    <>
      {/* CREATE FORM */}
      <form onSubmit={handleSubmit}
        className='flex gap-3 p-5 bg-gray-900 text-white'>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button>Create</button>
      </form>

      {/* NOTES */}
      <div className='flex gap-5 p-5 bg-gray-800 min-h-screen'>
        {
          notes.map(note => (
            <div key={note._id}
              className='bg-gray-500 p-4 rounded text-white w-60 h-50  flex flex-col gap-2 items-center '>
                {
                  editingId === note._id ?(
                    <input type="text"
                  className='border-2 border-black'

                    value={edittitle}
                    onChange={(e)=>{setedittitle(e.target.value)}} />
                  ):     (<h2>{note.title}</h2>)
                }

              {/* 🔥 CONDITIONAL RENDERING */}
              {
                editingId === note._id ? (
                  <input 
                  className='border-2 border-black'
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <p>{note.description}</p>
                )
              }

              <button onClick={() => handleDelete(note._id)}>
                Delete
              </button>

              {/* 🔥 UPDATE / SAVE BUTTON */}
              {
                editingId === note._id ? (
                  <button onClick={() => handleUpdate(note._id, edittitle ,editText)}>
                    Save
                  </button>
                ) : (
                  <button onClick={() => {
                    setEditingId(note._id)
                    setEditText(note.description)
                    setedittitle(note.title)
                  }}>
                    Update
                  </button>
                )
              }

            </div>
          ))
        }
      </div>
    </>
  )
}

export default App