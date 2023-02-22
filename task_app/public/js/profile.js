window.addEventListener('load', (event) => {
    event.preventDefault();
    renderLocations();
})

// document.querySelector('#locations').addEventListener('click', (e) => {
//     if(e.target && e.target.id === 'addLocation'){
//         e.preventDefault();
//         changeLocation();
//     }
    
// })

document.querySelector('#addLocation').addEventListener('submit', (e) => {
    e.preventDefault();
    const locToAdd = document.querySelector('#locName').value       
    const locType = document.querySelector('#locType').value
    addLocation(locToAdd, locType)
})


function addLocation(locToAdd, locType){
    fetch('/users/me/location', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            location: locToAdd,
            type: locType
        })
    }).then((r) => {
        if(r.status === 401){
            location.assign('/login')
        }
        if(r.status != 200){
            r.json().then((data) => {
                console.log(data);
            })
        } else {
            r.json().then((data) => {
                renderLocations();
            })
        }
    })
}

function renderLocations(){
    fetch('/users/me')
    .then((response) => { 
        if (response.status === 401) {
            location.assign('/login')
        } 
        if (response.status !=200){
            response.json().then((data) => {
                console.log(JSON.stringify(data))
            }) 
        } else {
            response.json().then((data) =>{ 
                document.querySelector('#email').textContent = JSON.stringify(data.email)
                document.querySelector('#userName').textContent = JSON.stringify(data.name)
                const locEl = document.querySelector('#locations')
                renderLocArray(data.locations, locEl)
            })
        }
        
    }
)}

function renderLocArray(locArray, locEl){
    locEl.innerHTML = '';
    locArray.forEach((element) => {
        renderElementInLocationArray(element, locEl)
    })   
}

function renderElementInLocationArray(element, locEl){
    const mainDiv = document.createElement('div')
    mainDiv.id = element._id
    locEl.appendChild(mainDiv);

    const locDiv = document.createElement('div')
    mainDiv.appendChild(locDiv)

    const nameDiv = document.createElement('div')
    nameDiv.textContent = element.location.name;
    nameDiv.setAttribute('data-id', 'locName')
    locDiv.appendChild(nameDiv)

    const typeDiv = document.createElement('div')
    typeDiv.textContent = element.location.locType
    typeDiv.setAttribute('data-id', 'locType')
    locDiv.appendChild(typeDiv)

    const editButton = document.createElement('button')
    editButton.textContent = 'Edit'
    mainDiv.appendChild(editButton)
    editButton.addEventListener('click', editLocation)

    const delButton = document.createElement('button')
    delButton.textContent = 'Delete'
    mainDiv.appendChild(delButton)
    delButton.addEventListener('click', deleteLocation)
}

function editLocation(event){
    const buttonClicked = event.target;
    const idToEdit = (buttonClicked.parentElement.getAttribute('id')).toString()
    const previousEl = buttonClicked.previousSibling;
    const insideDivs = previousEl.querySelectorAll('div')
    
    insideDivs.forEach( element => {
        const inputElement = document.createElement("input");
        inputElement.value = element.textContent
        for (let i = 0; i <element.attributes.length; i++) {
            const attr = element.attributes[i];
            inputElement.setAttribute(attr.name, attr.value);
        }
        element.parentNode.replaceChild(inputElement, element)
    })
    
    const buttonSave = document.createElement('button')
    buttonSave.textContent = 'Save'
    buttonClicked.parentNode.replaceChild(buttonSave, buttonClicked)
    buttonSave.addEventListener('click', saveEditedLocation)
}

function deleteLocation(event){
    const buttonClicked = event.target;
    const idToDelete = (buttonClicked.parentElement.getAttribute('id')).toString()
    deleteLocationCall(idToDelete);
}

function deleteLocationCall(id){
    fetch('/users/me/location/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then((response) => {
        if (response.status === 401) {
            location.assign('/login')
        }
        if (response.status !=200){
            response.json().then((data) => {
                console.log(JSON.stringify(data))
            }) 
        } else {
            response.json().then((data) => {
                console.log(data);
                renderLocations();
            })
        }  
    }) 
}

function saveEditedLocation(event){
    const buttonClicked = event.target;
    const idToEdit = (buttonClicked.parentElement.getAttribute('id')).toString()
    const previousEl = buttonClicked.previousSibling;
    const insideDivs = previousEl.querySelectorAll('input')

    const newLocType = Array.from(insideDivs).find(div => div.getAttribute('data-id')==='locType')
    const newLocName = Array.from(insideDivs).find(div => div.getAttribute('data-id') === 'locName');

    fetch('/users/me/location/'+idToEdit, {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            name: newLocName.value,
            type: newLocType.value
        })
    }).then((r) => {
        if(r.status === 401){
            location.assign('/login')
        }
        if(r.status != 200){
            r.json().then((data) => {
                console.log(data);
            })
        } else {
            r.json().then((data) => {
                renderLocations();
            })
        }
    })
}
