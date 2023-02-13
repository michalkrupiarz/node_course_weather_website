const loginForm = document.querySelector('#registerForm');

loginForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    fetch('/users',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: loginForm.querySelector('#name').value,
            email : loginForm.querySelector('#login').value,
            password: loginForm.querySelector('#password').value
        })
    }).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log("this is data error", data.error)
                return document.querySelector("#errorMessage").textContent = JSON.stringify(data.error);
            } 
            console.log(data)
            window.location.href = "/index"
        })
    }).catch (error => {
        console.log(error.error)
    })
})