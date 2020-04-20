
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
      },
      {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
      },
      {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
      }
]


app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes.map(note => note.toJSON()))
    })
})

app.get('/api/notes/:id', (req, res) => {
    Note.findById(req.params.id).then(note => {
        res.json(note.toJSON())
    })
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
    const body = req.body

    if (!body.content) {
        return res.status(400).json({ error: 'content missing' })
    }
    
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })

    note.save().then(savedNote => {
        res.json(savedNote.toJSON())
    })
})

app.put('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(n => n.id === id)

    if (!note)
        res.status(204).end()
    const newNote = { ...note, important: !note.important }
    notes = notes.map(n => n.id !== id ? n : newNote)
    res.json(newNote)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})