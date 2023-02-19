window.addEventListener('load', (event) => {
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

                    data.locations.forEach((element) => {
                        const div = document.createElement('div')
                        div.id = element._id
                        div.textContent = JSON.stringify(element)
                        locEl.appendChild(div);
                    })
                    
                    const addLoc = document.createElement('button', 'Add Location')
                    addLoc.id = 'addLocation'
                    addLoc.value = 'Add Location'
                    addLoc.textContent = 'Add Location'

                    locEl.appendChild(
                        addLoc
                    )

                    console.log(data)
                })
            }
            
        }
    )
})

window.onload= function() {
    const sth = (document.querySelector('#locations'))
    console.log('sth', sth)
}


document.querySelector('#locations').addEventListener('click', (e) => {
    if(e.target && e.target.id === 'addLocation'){
        e.preventDefault();
        fetch('/users/me/location', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                location: 'Kraków'
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
                    console.log(data);
                })
            }
        })
    }
    
})

    