// display date and time

let now = new Date();

let date = now.getDate();
let month = now.getMonth();
let year = now.getFullYear();
let hour = now.getHours();
let minute = now.getMinutes();

if (minute < 10) {
  minute = "0" + minute;
}

if (hour < 10) {
  hour = "0" + hour;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let day = days[now.getDay()];

let h5 = document.querySelector("#date-time");

h5.innerHTML = `${day} ${month}/${date}/${year} ${hour}:${minute}`;

// search for city

function showTemperature(response) {
  let cityName = response.data.name;

  console.log(response);
  cityName = cityName.toLowerCase();

  //Change header to Current Temp of city searched
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#h1");
  h1.innerHTML = `Currently, It is ${temperature}°C in ${cityName}`;

  //Current Day high low
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  let currentDayHighLow = document.querySelector("#current-day-high-low");
  currentDayHighLow.innerHTML = `${high}°C /${low}°C`;

  //Current Day Humidity
  let humidity = Math.round(response.data.main.humidity);
  let currentDayHumidity = document.querySelector("#current-day-humidity");
  currentDayHumidity.innerHTML = `Humidity : ${humidity}%`;

  //Current Day Pressue
  let pressure = response.data.main.pressure;
  let currentDayPressure = document.querySelector("#current-day-pressure");
  currentDayPressure.innerHTML = `Pressure: ${pressure} mb`;

  //current-day-windspeed
  let windspeed = response.data.wind.speed;
  let currentDayWindspeed = document.querySelector("#current-day-windspeed");
  currentDayWindspeed.innerHTML = `Windspeed: ${windspeed} km/h`;
}
function getCity(event) {
  event.preventDefault();

  let apiKey = "0ae703064e17d8cb6a410a5138e15a28";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let cityNameInput = document.querySelector("#change-city");
  let cityName = cityNameInput.value;

  axios
    .get(`${apiUrl}q=${cityName}&appid=${apiKey}&units=metric`)
    .then(showTemperature);
}

let changeCity = document.querySelector("#change-city-form");
changeCity.addEventListener("submit", getCity);

//get current location data
function getWeatherByCoords(position) {
  let apiKey = "0ae703064e17d8cb6a410a5138e15a28";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(showTemperature);
}

function getCoords(event) {
  navigator.geolocation.getCurrentPosition(getWeatherByCoords);
}

let currentLocation = document.querySelector("#current-city-button");
currentLocation.addEventListener("click", getCoords);
