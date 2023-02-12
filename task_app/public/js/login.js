const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    console.log(loginForm.querySelector('#login').value);
    console.log(loginForm.querySelector('#password').value);
    fetch('/users/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login : loginForm.querySelector('#login').value,
            password: loginForm.querySelector('#password').value
        })
    })
    .then((response) => {
        console.log(response);
        response.json().then((data) => {
            // if(data.error){
            //     console.log('We have error');
            // }
            console.log(data)
        })
    })
})