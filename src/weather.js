let currentDate = new Date();
let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[currentDate.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Agust",
  "Septamber",
  "October",
  "November",
  "December",
];
let month = months[currentDate.getMonth()];
let year = currentDate.getFullYear();
let hour = currentDate.getHours();
if (hour < 10) {
  hour = `0${currentDate.getHours()}`;
}
let minute = currentDate.getMinutes();
if (minute < 10) {
  minute = `0${currentDate.getMinutes()}`;
}
let h2 = document.querySelector("#date");
h2.innerHTML = `${day},${month} ${hour}:${minute}`;
function forecastDate(timestamp) {
  let now = new Date(timestamp * 1000);

  let day = now.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function showForecastTemp(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="col-sm-2 mb-3 mb-sm-0">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${forecastDate(forecastDay.time)}</h5>
                <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                  forecastDay.condition.icon
                }.png" class="forecast-icon" />
                <p class="card-text">${Math.round(
                  forecastDay.temperature.maximum
                )}°|<span id="minimum">${Math.round(
          forecastDay.temperature.minimum
        )}°</span></p>
              </div>
            </div>
          </div>`;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}
function displayForecast(coordinates) {
  let apiKey = `47b8a1e3deb146o2b0d0f91ac0t39049`;
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;

  axios.get(forecastUrl).then(showForecastTemp);
}

function showTemp(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  let h3 = document.querySelector("h3");
  h3.innerHTML = response.data.condition.description;
  let tempreature = document.querySelector("#tempreature");
  celsiusTemperature = response.data.temperature.current;
  tempreature.innerHTML = Math.round(celsiusTemperature);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  icon.setAttribute("alt", response.data.condition.icon);
  displayForecast(response.data.coordinates);
}
function cityName(city) {
  let apiKey = `47b8a1e3deb146o2b0d0f91ac0t39049`;
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  cityName(city);
}
let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);
function showLocationTemp(position) {
  let apiKey = `47b8a1e3deb146o2b0d0f91ac0t39049`;
  let locationUrl = `https://api.shecodes.io/weather/v1/current?lon=${response.data.coordinates.longitude}&lat=${response.data.coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(locationUrl).then(showTemp);
}
function locationTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocationTemp);
}
let button = document.querySelector(".btn-info");
button.addEventListener("click", locationTemp);
function showFahrenhietTempreature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperature = document.querySelector("#tempreature");
  temperature.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}
function showCelsiusTempreature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#tempreature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}
let fahrenheitLink = document.querySelector("#fahrenhietLink");
fahrenheitLink.addEventListener("click", showFahrenhietTempreature);
let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", showCelsiusTempreature);
let celsiusTemperature = null;
cityName("Tehran");
