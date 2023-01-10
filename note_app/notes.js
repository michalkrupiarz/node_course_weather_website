const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    const notes = loadNotes();
    console.log(chalk.green.bold("Your notes:"));
    notes.forEach(element => {
        console.log(chalk.green(element.title));
    });
}

const addNote = (title, body) => {
    const notes = loadNotes();

    debugger;

    if (isNoteOnTheList(title,notes)){
        console.log(chalk.yellow.inverse('Note with title ' +title+ ' exists, skipping.'));
    } else {
            notes.push({
                title: title,
                body: body
            });
        saveNotes(notes);
        console.log(chalk.green.inverse('NOte saved'))
    }   
}



const removeNote= (title)=>{
    const notes = loadNotes();
    if(isNoteOnTheList(title,notes)){
        saveNotes(notes.filter(note => note.title !== title));
        console.log(chalk.green.inverse('Note with title ' +title+ ' removed. '))
    } else {
        console.log(chalk.yellow.inverse('Note with title '+title+' not found on list.'));
    }
   
}

const readNote = (title)=>{
    const notes = loadNotes();
    const foundNote = isNoteOnTheList(title,notes);
    if (foundNote){
        console.log(chalk.green('Note found: '));
        console.log(chalk.green.inverse(foundNote.title));
        console.log(foundNote.body);
    } else {
        console.log(chalk.red.inverse('No note with title: ' + title + ' found.'));
    }
}

isNoteOnTheList = (title, notes) => {
 
    return notes.find(note => note.title === title);
}

saveNotes = (notes) => {
    try{
        fs.writeFileSync('notes.json', JSON.stringify(notes));                  
    } catch (e){
        console.log(chalk.red('Saving note failed', e));
    }
}

loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json')); 
    } catch (e) {
        return [];
    }
    
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}