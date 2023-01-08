const chalk = require('chalk');
const notes = require('./notes.js');
const validator = require('validator');
const yargs = require('yargs');

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
    handler: function(argv){
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
    handler: function (argv){
        notes.removeNote(argv.title);
    }
})

//create read command
yargs.command({
    command: 'create',
    describe: 'reads given note content',
    handler: function (){console.log('here will come content of note')}
})

//list command
yargs.command({
    command: 'listNotes',
    description: 'list existing notes',
    handler: function (){
        console.log('here will come list of notes')
    }
})

//console.log(process.argv);
//console.log(yargs.argv);
yargs.parse();
