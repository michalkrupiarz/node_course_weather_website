const links = document.querySelector('#navigation').querySelectorAll('a');

function makeApiRequest(event){
    event.preventDefault();
    const address = event.target.href;
    fetch(event.target.href, {
        method: "GET",
        headers: {
            "Authorization" : "Bearer " +getTokenFromCookie()
        }
        
    }
   
    ).then(response => {
        console.log('we are in index');
        //location.assign(address)
    });
}

links.forEach(link => {
    link.addEventListener("click", makeApiRequest);
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
