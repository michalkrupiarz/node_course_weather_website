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
                    forecast.className = "forecast";
                    mainDiv.appendChild(forecast);
                    forecast.innerHTML = newElement.innerHTML;
                    
                    showSavedForecast(JSON.parse(loc.location.forecast),loc.location.name, "id_"+loc._id);
                })
            })
        }
    })
})

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