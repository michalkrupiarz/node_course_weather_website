document.querySelector('#logout').addEventListener('click', (e) => {
    e.preventDefault();
    fetch('/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if(response.status != 200){
            response.json().then((data) => {
                console.log(JSON.stringify(data))
            })
        } else {
            location.assign('/login')
        }
    }).catch(error => {
        console.log(JSON.stringify(error))
    })
})