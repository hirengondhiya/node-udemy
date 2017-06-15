const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');
const titleOptions = {
    describe: 'Title of the note.',
    alias: 't',
    demand: true
};
const bodyOptions = {
    describe: 'body of the note.',
    alias: 'b',
    demand: true
};
const argv = yargs
            .command('add', 'Add new note', {
                    title: titleOptions,
                    body: bodyOptions,
                })
            .command('read', 'Read a note', {
                    title: titleOptions,
                })
            .command('remove', 'Remove a note', {
                    title: titleOptions,
                })
            .command('list', 'List all notes', { })
            .help()
            .argv;
const command = argv._[0];

var result = undefined;

if (command === 'add') {
    result = notes.addNote(args.title, args.body);
    if (!_.isUndefined(result)) {
        log('Note added successfully.', result);
    } else {
        log(`Note can not be added due to duplication.`);
    }
} else if (command === 'list') {
    var result = notes.getAllNotes();
    log(result || 'No notes found.')
} else if (command === 'read') {
    result = notes.readNote(args.title);
    log(result || 'Note with given title not found.')
} else if (command === 'remove') {
    result = notes.removeNote(args.title);
    if (!_.isUndefined(result)) {
        log('Note removed successfully.', result);
    } else {
        log('Note not found.')
    }
} else {
    log('Command not recognized.');
}


function log () {
    function innerLog(msg) {
        if (_.isString(msg)) {
            console.log(msg);
        } else if (_.isArray(msg)) {
            for (line in msg) {
                log(msg[line]);
            }
        } else if (_.isObject(msg)) {
            for (line in msg) {
                console.log(`${line}: ${msg[line]}`);
            }
        }
    }
    var args = [].slice.call(arguments);
    args.forEach(innerLog);
}