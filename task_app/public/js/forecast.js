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
                console.log('error');
            })
        } else {
            r.json().then((data) => {
                const mainDiv = document.querySelector("#forecasts");
                const newElement = document.createElement("div");
                showSavedForecasts(data, mainDiv, newElement);
            })
        }
    })
})



function showSavedForecasts(data, mainDiv, newElement){
    newElement.innerHTML = mainDiv.innerHTML;
    mainDiv.innerHTML = "";
    data.forEach(loc => {
        const forecast = document.createElement("div");
        forecast.id = "id_"+loc._id;
        forecast.className = "forecast";
        mainDiv.appendChild(forecast);
    //    forecast.innerHTML = newElement.innerHTML;
        
        showSavedForecast(JSON.parse(loc.location.forecast),loc.location.name, "id_"+loc._id);
    })
}

function showSavedForecast(data, location, id){
    const weather= data.weather[0];
    const temp = data.main;
    document.querySelector('#'+id).querySelector("[data-name=place]").textContent = location;
    document.querySelector('#'+id).querySelector("[data-name=typeOfWeather]").textContent = weather.main
        +' ('+weather.description+')';
    document.querySelector('#'+id).querySelector("[data-name=temp]").textContent = (temp.temp);
    document.querySelector('#'+id).querySelector("[data-name=feelsLike]").textContent = (temp.feels_like);
    document.querySelector('#'+id).querySelector("[data-name=tempMin]").textContent = (temp.temp_min);
    document.querySelector('#'+id).querySelector("[data-name=tempMax]").textContent = (temp.temp_max);
    document.querySelector('#'+id).querySelector("[data-name=pressure]").textContent = (temp.pressure);
    document.querySelector('#'+id).querySelector("[data-name=humidity]").textContent = (temp.humidity);
    document.querySelector('#'+id).querySelector("[data-name=visibility]").textContent = data.visibility;
    document.querySelector('#'+id).querySelector("[data-name=windSpeed]").textContent = data.wind.speed;
    document.querySelector('#'+id).querySelector("[data-name=sunrise]").textContent = convertTime(data.sys.sunrise);
    document.querySelector('#'+id).querySelector("[data-name=sunset]").textContent = convertTime(data.sys.sunset);
}