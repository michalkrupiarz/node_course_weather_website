const fs = require('fs');
const chalk = require('chalk');

function getNotes(){
    return 'Your notes....';
}

function addNote(title, body){
    const notes = loadNotes();
    if (isNoteOnTheList(title,notes)){
        console.log(chalk.yellow('Note with title ' +title+ ' exists, skipping.'));
    } else {
        notes.push({
        title: title,
        body: body
        });
        saveNotes(notes);
    }   
}

function isNoteOnTheList(title, notes){
    return notes.filter(note => note.title === title).length > 0;
}

function removeNote(title){
    const notes = loadNotes();
    if(isNoteOnTheList(title,notes)){
        saveNotes(notes.filter(note => note.title !== title));
        console.log(chalk.green.inverse('Note with title ' +title+ ' removed. '))
    } else {
        console.log(chalk.yellow.inverse('Note with title '+title+' not found on list.'));
    }
   
}
   
function saveNotes(notes){
    try{
        fs.writeFileSync('notes.json', JSON.stringify(notes));                  
    } catch (e){
        console.log(chalk.red('Saving note failed', e));
    }
}

function loadNotes(){
    try {
        return JSON.parse(fs.readFileSync('notes.json')); 
    } catch (e) {
        return [];
    }
    
}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}