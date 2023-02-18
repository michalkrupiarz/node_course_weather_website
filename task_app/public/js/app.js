console.log('client side javascript')

const doc = document;

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
    const token = getTokenFromCookie(doc);
    label.textContent = 'Loading...';
    fetch('/weather?address='+location+'&provider='+provider , {
        headers: {
            "Authorization": 'Bearer '+token
        }
    })
        .then((response) => {
            if(response.status===401){
                console.log('Unathorized.')
                window.location.href = "/";
            }
            response.json().then((data) => {
                if (data.error){
                    label.textContent = "Error";
                    return forecast.textContent = data.error; 
                }
                
                label.textContent = 'Forecast';
                const weather= data.forceast.weather[0];
                const temp = data.forceast.main;
                console.log(data)
                document.querySelector("#menuForecast").textContent='Forecast';
                document.querySelector("#place").textContent = JSON.stringify(location);
                document.querySelector("#typeOfWeather").textContent = JSON.stringify(weather.main)
                    +' ('+JSON.stringify(weather.description)+')';
                document.querySelector("#temp").textContent = JSON.stringify(temp.temp);
                document.querySelector("#feelsLike").textContent = JSON.stringify(temp.feels_like);
                document.querySelector("#tempMin").textContent = JSON.stringify(temp.temp_min);
                document.querySelector("#tempMax").textContent = JSON.stringify(temp.temp_max);
                document.querySelector("#pressure").textContent = JSON.stringify(temp.pressure);
                document.querySelector("#humidity").textContent = JSON.stringify(temp.humidity);
                document.querySelector("#visibility").textContent = JSON.stringify(data.forceast.visibility);
                document.querySelector("#windSpeed").textContent = JSON.stringify(data.forceast.wind.speed);
                document.querySelector("#sunrise").textContent = JSON.stringify(convertTime(data.forceast.sys.sunrise));
                document.querySelector("#sunset").textContent = JSON.stringify(convertTime(data.forceast.sys.sunset));
                return forecast.textContent = JSON.stringify(data.forcast); 
            })
        }
    )
}

function convertTime(time) {
    const date = new Date(time*1000)
    return date.toLocaleDateString("en-UK", {
        timeZone: "Europe/Berlin",
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })
}

function getTokenFromCookie(document) {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies){
        const [name, value ] = cookie.split("=");
        if (name.trim() === "token"){
            return value;
        }
    }
    return null;
}



