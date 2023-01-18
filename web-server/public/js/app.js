console.log('client side javascript')


const openwheatermapForm = document.querySelector('#openweathermap');
const tommorowForm = document.querySelector('#tommorow');
const weeatherstackForm = document.querySelector('#weatherstack');

openwheatermapForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    fetchForecastFromProvider(openwheatermapForm.querySelector('input').value, 'openweathermap', openwheatermapForm)
})

tommorowForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchForecastFromProvider(tommorowForm.querySelector('input').value, 'tommorow', tommorowForm)
    
})

weeatherstackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchForecastFromProvider(weeatherstackForm.querySelector('input').value, 'weatherstack', weeatherstackForm)
})

function fetchForecastFromProvider(location, provider, form){
    const label = form.querySelector('p[name="label"]');
    const forecast = form.querySelector('p[name="forecast"]');

    label.textContent = 'Loading...';
    fetch('/weather?address='+location+'&provider='+provider)
        .then((response) => {
            response.json().then((data) => {
                if (data.error){
                    label.textContent = "Error";
                    return forecast.textContent = data.error; 
                }
                label.textContent = 'Forecast';
                return forecast.textContent = JSON.stringify(data); 
            })
        }
    )
}