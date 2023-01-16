console.log('client side javascript')

fetch('/weather?address=Mietków')
    .then((response) => {
        response.json().then((data) => {
            if(data.error){
               return console.log(data.error);
            }
            console.log(data);
        })
    });