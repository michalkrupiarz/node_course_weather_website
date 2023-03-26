window.addEventListener('load', (event) => {
    event.preventDefault();
    fetch('/notes').then((response) => {
        if(response.status === 401){
            location.assign('/login');
        }
        if (response.status != 200) {
            response.json().then((data) => {
                console.log(data);
            })
        } else {
            console.log(response);
            response.json().then((data) => {
                console.log(data.userNotes);
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
    noteNode.querySelector('.id').textContent = note._id;
    noteNode.querySelector('.noteTitle').textContent = note.title;
    noteNode.querySelector('.noteAuthor').id = "id_" +note.author.id;
    noteNode.querySelector('.noteAuthor').textContent = note.author.email;
    
}