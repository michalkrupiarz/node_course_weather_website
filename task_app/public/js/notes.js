window.addEventListener('load', (event) => {
    event.preventDefault();
    console.log('cos tam')
    fetch('/notes').then((response) => {
        if(response.status === 401){
            location.assign('/login');
        }
        if (response.status != 200) {
            response.json().then((data) => {
                console.log(data);
            })
        } else {
            response.json().then((data) => {
                console.log(data.userNotes.notes);
                renderNotes(data.userNotes.notes);
            })
        }
    })
})

function renderNotes(data){
    const note = document.querySelector(".note");
    const notes = document.querySelector(".notes");
    notes.innerHTML = '';
        data.forEach((el) => {
        const newNote = note.cloneNode(true);
        notes.appendChild(newNote);
        renderNote(el, newNote);
    })
}

function renderNote(note, noteNode){
    noteNode.id = "id_" +note._id;
}