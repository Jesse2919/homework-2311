const util = require('util')
const fs = require('fs')
const uuidv1 = require('uuid/v1')

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf8')
    }
    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note))
    }

    getNotes() {
        return this.read().then((notes) => {
            return notes ? [].concat(JSON.parse(notes)) : []

        })
    }

    addNotes(note) {
        const { title, text } = note

        if (!title || !text) {
            throw new Error("title and text must be included")
        }
        const newNote = { title, text, id: uuidv1() };
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote);
    }

    removeNote(id) {
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((updatedNotes) => this.write(updatedNotes));
    }
}
module.exports = new Store();