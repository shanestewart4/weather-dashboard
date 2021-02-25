// variables

// search button
let searchBtn = document.getElementById("search-button");
// search field
let searchField = document.getElementById("search-field");

let displayToday = document.querySelector("#today-display");

let displayUV = document.querySelector("#uv-display");

let displayForecast = document.querySelector("#forecast-display");



// search field wrapper
let searchFieldWrapper = document.getElementById("list-group");

// api Key
const apiKey = "1fd03ba9b2456cc9b6337b4f3520bd01";

// sets key count to 0 for localStorage
let countKey = 0;

// Search Button -- click event function gets data from APIs
searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const searchFieldValue = searchField.value.trim();
    console.log(searchFieldValue);
    makeList(searchFieldValue);
    todayRequest(searchFieldValue);
    forecastRequest(searchFieldValue);
});

function makeList(searchFieldValue) {
    let liEl = document.createElement("li");
    liEl.innerHTML = `
        <div class="list-group-item, list-group-item-action">
            
        </div>
    `
}


async function todayRequest (searchFieldValue) {
    // variables for todays weather
    let urlToday = "https://api.openweathermap.org/data/2.5/weather?q=" + searchFieldValue + "&Appid=" + apiKey + "&units=imperial";
    const resToday = await fetch(urlToday);
    const dataToday = await resToday.json();
    console.log("todays weather", dataToday);
    useTodayData(dataToday);
    uvRequest(dataToday);

}

async function uvRequest (dataToday) {    
    // variables for UV
    let uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + dataToday.coord.lat + "&lon="+ dataToday.coord.lon + "&appid=" + apiKey;
    const resUV = await fetch(uvUrl);
    const dataUV = await resUV.json();
    console.log("todays UV", dataUV);
    useUvData(dataUV);

}

async function forecastRequest (searchFieldValue) {
    // variables for 5Day
    let urlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchFieldValue + "&Appid=" + apiKey + "&units=imperial";
    const resForecast = await fetch(urlForecast);
    const dataForecast = await resForecast.json();
    console.log("forecast weather", dataForecast);
    useForecastData(dataForecast);
}
    

// functions to use data and append to page with innerHTML

function useTodayData (dataToday) {
    displayToday.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${dataToday.weather[0].main}" class="card-img-top" alt="weather icon">
            <div class="card-body">
                <h5 class="card-title">${dataToday.name}</h5>
                <p class="card-text">Temperature: ${dataToday.main.temp} degrees Fahrenheit</p>
                <p class="card-text">Description: ${dataToday.weather[0].description}</p>
                <p class="card-text">Humidity: ${dataToday.main.humidity}%</p>
                <p class="card-text">Wind Speed: ${dataToday.wind.speed} mph</p>
            </div>
        </div>
    `
};


async function useUvData (dataUV) {
    displayUV.innerHTML = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">UV Index:</h5>
                <p class="card-text">${dataUV.value}</p>
            </div>
        </div>
    `
};



function useForecastData (dataForecast) {
    displayForecast.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${dataForecast.weather[0].main}" class="card-img-top" alt="weather icon">
            <div class="card-body">
                <h5 class="card-title">${dataForecast.name}</h5>
                <p class="card-text">Temperature: ${dataForecast.main.temp} degrees Fahrenheit</p>
                <p class="card-text">Description: ${dataForecast.weather[0].description}</p>
                <p class="card-text">Wind Speed: ${dataForecast.wind.speed} mph< /p>
            </div>
        </div>
    `
};



//     // append li to list-group
//     let citySearchedEl = document.createElement("li");
//     citySearchedEl.textContent = searchFieldValue;
//     citySearchedEl.classList = "list-item";
//     searchFieldWrapper.appendChild(citySearchedEl);



//     // local storage time!
//     localStorage.setItem(countKey, dataToday.name);
//     countKey = countKey + 1;
//     console.log(countKey, dataToday.name);


//     // begin to append todays weather
//     let todayCardEl = document.getElementById("today-display");
    
//     // empty today's card prior to adding the data
//     todayCardEl.innerHTML = "";
//     let todayDateEl = document.createElement("div");
//     todayCardEl.append(todayDateEl);


//     // edit the date
//     let utcTime = new Date(dataToday.dt * 1000);
//     // switch to en-US
//     todayDateEl.append(dataToday.name + " " + utcTime.toLocaleDateString("en-US"));
//     todayDateEl.classList = "list-item flex-row justify-space-between align-center";
    
    
//     // todays uv
//     let todayUv = todayTemp.appendChild("UV Index: " + dataUV.value + "</p>").addClass("card-text");
//     todayTempEl.appendChild(todayUv);

    
//     // create an arry for 5 day forecast
//     let day = [];


//     // forecast uv

// })