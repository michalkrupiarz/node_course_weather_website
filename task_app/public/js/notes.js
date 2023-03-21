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

                console.log(data);
            })
        }
    })
})