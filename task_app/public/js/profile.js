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
    const div = document.createElement('div')
    div.id = element._id
    div.textContent = JSON.stringify(element)
    locEl.appendChild(div);
    const delButton = document.createElement('button');
    delButton.textContent = 'Delete';
    div.appendChild(delButton);
    delButton.addEventListener('click', deleteLocation)
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
