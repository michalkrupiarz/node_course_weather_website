const chalk = require('chalk');
const notes = require('./notes.js');
const validator = require('validator');
const yargs = require('yargs');
const { triggerAsyncId } = require('async_hooks');

//customize version
yargs.version('1.1.0');

// add, remove, read, list, 

//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Content of node',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body);
    }
});

//create remove command 
yargs.command({
    command: 'remove',
    describe: 'removes a note',
    builder: {
        title: {
            describe: 'Title of note to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title);
    }
})

//create read command
yargs.command({
    command: 'read',
    describe: 'reads given note content',
    builder:{
        title: {
            describe: 'Title of note to look for',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){notes.readNote(argv.title)}
})

//list command
yargs.command({
    command: 'listNotes',
    description: 'list existing notes',
    handler(){
        notes.getNotes();
    }
})

//console.log(process.argv);
//console.log(yargs.argv);
yargs.parse();
