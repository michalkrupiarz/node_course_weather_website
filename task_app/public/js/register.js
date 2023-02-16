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
        if(response.status != 201){
            response.json().then((data) => {
                document.querySelector("#errorMessage").textContent = JSON.stringify(data.error);
            })            
        } else {
            location.assign('/index')
        }
    }).catch (error => {
        document.querySelector("#errorMessage").textContent = JSON.stringify(data.error);
    })
})