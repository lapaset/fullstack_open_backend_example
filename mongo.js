const mongoose = require('mongoose')

if ( process.argv.length < 3 ) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstackopen:${password}@cluster0-wzaol.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'mulle',
    date: new Date(),
    important: true
})

note.save().then(response => {
    console.log('note saved!')
    mongoose.connection.close()
})

/*Note.find({ important: false }).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})*/