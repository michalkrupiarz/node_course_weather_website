const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    fetch('/users/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login : loginForm.querySelector('#login').value,
            password: loginForm.querySelector('#password').value
        })
    }).then((response) => {
        response.json().then((data) => {
            if(data.error){
               return document.querySelector("#errorMessage").textContent = JSON.stringify(data.error);
            } 
            window.location.href = "/index"
        })
    }).catch (error => {
        console.log(error.error)
    })
})