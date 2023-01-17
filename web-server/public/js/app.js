console.log('client side javascript')


const weatherForm = document.querySelector('form');

const search = document.querySelector('input');

const messageOne = document.querySelector('#msg1');
const messageTwo = document.querySelector('#msg2');

weatherForm.addEventListener('submit', (e)=>{
    messageOne.textContent = '';
    e.preventDefault();
    let location = search.value;
    if (location.length <1 ){
        location = 'Mietków';
    }
    messageOne.textContent = 'Loading'
    fetch('/weather?address='+location)
    .then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = 'Error';
               return messageTwo.textContent = data.error;
            }
            messageOne.textContent = "Forecast" 
            messageTwo.textContent = data.forceast.main;
            console.log(data);
        })
    });

})