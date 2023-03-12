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


window.addEventListener('load', (event) => {
    event.preventDefault();
    console.log("loaded");
    fetch('/weather/me')
    .then((r) => {
        if(r.status === 401){
            location.assign('/login')
        }
        if(r.status != 200){
            r.json().then((data) => {
                console.log(data);
            })
        } else {
            r.json().then((data) => {
                console.log(JSON.parse(data[0].location.forecast))
                const mainDiv = document.querySelector("#forecasts");
                const newElement = document.createElement("div");
                newElement.innerHTML = mainDiv.innerHTML;
                mainDiv.innerHTML = "";
                data.forEach(loc => {
                    const forecast = document.createElement("div");
                    forecast.id = "id_"+loc._id;
                    mainDiv.appendChild(forecast);
                    forecast.innerHTML = newElement.innerHTML;
                    
                    showSavedForecast(JSON.parse(loc.location.forecast),loc.location.name, "id_"+loc._id);
                })
            })
        }
    })
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
                location.assign('/index');
            } 
            response.json().then((data) => {
                if (data.error){
                    label.textContent = "Error";
                    return forecast.textContent = data.error; 
                }
                label.textContent = 'Forecast';
                showForecast(data, location);
                return forecast.textContent = JSON.stringify(data.forcast); 
            })
        }
    )
}

function showForecast(data, location){
    const weather= data.forecast.weather[0];
    const temp = data.forecast.main;
    document.querySelector("[data-name=menuForecast]").textContent='Forecast';
    document.querySelector("[data-name=place]").textContent = JSON.stringify(location);
    document.querySelector("[data-name=typeOfWeather]").textContent = JSON.stringify(weather.main)
        +' ('+JSON.stringify(weather.description)+')';
    document.querySelector("[data-name=temp]").textContent = JSON.stringify(temp.temp);
    document.querySelector("[data-name=feelsLike]").textContent = JSON.stringify(temp.feels_like);
    document.querySelector("[data-name=tempMin]").textContent = JSON.stringify(temp.temp_min);
    document.querySelector("[data-name=tempMax]").textContent = JSON.stringify(temp.temp_max);
    document.querySelector("[data-name=pressure]").textContent = JSON.stringify(temp.pressure);
    document.querySelector("[data-name=humidity]").textContent = JSON.stringify(temp.humidity);
    document.querySelector("[data-name=visibility]").textContent = JSON.stringify(data.forceast.visibility);
    document.querySelector("[data-name=windSpeed]").textContent = JSON.stringify(data.forceast.wind.speed);
    document.querySelector("[data-name=sunrise]").textContent = JSON.stringify(convertTime(data.forceast.sys.sunrise));
    document.querySelector("[data-name=sunset]").textContent = JSON.stringify(convertTime(data.forceast.sys.sunset));
}


function showSavedForecast(data, location, id){
    const weather= data.weather[0];
    const temp = data.main;
    document.querySelector('#'+id).querySelector("[data-name=menuForecast]").textContent='Forecast';
    document.querySelector('#'+id).querySelector("[data-name=place]").textContent = JSON.stringify(location);
    document.querySelector('#'+id).querySelector("[data-name=typeOfWeather]").textContent = JSON.stringify(weather.main)
        +' ('+JSON.stringify(weather.description)+')';
    document.querySelector('#'+id).querySelector("[data-name=temp]").textContent = JSON.stringify(temp.temp);
    document.querySelector('#'+id).querySelector("[data-name=feelsLike]").textContent = JSON.stringify(temp.feels_like);
    document.querySelector('#'+id).querySelector("[data-name=tempMin]").textContent = JSON.stringify(temp.temp_min);
    document.querySelector('#'+id).querySelector("[data-name=tempMax]").textContent = JSON.stringify(temp.temp_max);
    document.querySelector('#'+id).querySelector("[data-name=pressure]").textContent = JSON.stringify(temp.pressure);
    document.querySelector('#'+id).querySelector("[data-name=humidity]").textContent = JSON.stringify(temp.humidity);
    document.querySelector('#'+id).querySelector("[data-name=visibility]").textContent = JSON.stringify(data.visibility);
    document.querySelector('#'+id).querySelector("[data-name=windSpeed]").textContent = JSON.stringify(data.wind.speed);
    document.querySelector('#'+id).querySelector("[data-name=sunrise]").textContent = JSON.stringify(convertTime(data.sys.sunrise));
    document.querySelector('#'+id).querySelector("[data-name=sunset]").textContent = JSON.stringify(convertTime(data.sys.sunset));
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



