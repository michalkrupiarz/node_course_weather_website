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



