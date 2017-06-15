var fs = require('fs');
var _ = require('lodash');
var noteFileName = 'note-data.json';

var fetchNotes = () => {
    var notes = [];

    // read existing notes 
    try {
        var notesString = fs.readFileSync(noteFileName) ;
        notes = JSON.parse(notesString);
    } catch (e) { }

    return notes;
}

var saveNotes = (notes) => {
    fs.writeFileSync(noteFileName, JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = { title,
        body
    };

    // find if note with given title exists
    var duplicate = notes.filter((note) => note.title === title);

    if (!duplicate.length) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};
var getAllNotes = () => {
    return fetchNotes();
};
var readNote = (title) => {
    var notes = fetchNotes();
    var filtered = notes.filter((note) => note.title === title);
    if (filtered.length) {
        return filtered[0];
    }
};
var removeNote = (title) => {
    var notes = fetchNotes();
    var removedNotes = notes.filter((note) => note.title === title);
    if (removedNotes.length) {
        var filtered = notes.filter((note) => note.title !== title);
        saveNotes(filtered);
        return removedNotes[0];
    }
};

module.exports = {
    addNote,
    getAllNotes,
    readNote,
    removeNote
};