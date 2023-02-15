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
        if(response.status !=200){
            console.log('sth');
        } else {
        console.log('Response anything');
        //window.location = '/index';
        location.assign('/index')
        }
    }).catch (error => {
        console.log("is this even here", error.error)
        window.location.href = "/"
    })
})

function getTokenFromCookie() {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies){
        const [name, value ] = cookie.split("=");
        if (name.trim() === "token"){
            return value;
        }
    }
    return null;
}